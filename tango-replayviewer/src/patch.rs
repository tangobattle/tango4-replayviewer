use crate::{game, rom, scanner};

#[derive(serde::Deserialize, Debug)]
struct Metadata {
    pub patch: PatchMetadata,
    pub versions: std::collections::HashMap<String, VersionMetadata>,
}

#[derive(serde::Deserialize, Debug)]
struct PatchMetadata {
    pub title: String,
    pub authors: Vec<String>,
    pub license: Option<String>,
    pub source: Option<String>,
}

#[derive(serde::Deserialize, Debug)]
struct VersionMetadata {
    #[serde(default)]
    pub rom_overrides: rom::Overrides,
    pub netplay_compatibility: String,
}

#[derive(Clone)]
pub struct Version {
    pub rom_overrides: rom::Overrides,
    pub netplay_compatibility: String,
    pub supported_games: std::collections::HashSet<&'static (dyn game::Game + Send + Sync)>,
}

pub struct Patch {
    pub path: std::path::PathBuf,
    pub title: String,
    pub authors: Vec<mailparse::SingleInfo>,
    pub license: Option<String>,
    pub source: Option<String>,
    pub readme: Option<String>,
    pub versions: std::collections::HashMap<semver::Version, std::sync::Arc<Version>>,
}

pub fn scan(
    path: &std::path::Path,
) -> Result<std::collections::BTreeMap<String, std::sync::Arc<Patch>>, std::io::Error> {
    let mut patches = std::collections::BTreeMap::new();
    for entry in std::fs::read_dir(path)? {
        let entry = match entry {
            Ok(entry) => entry,
            Err(e) => {
                log::error!("failed to read dir: {:?}", e);
                continue;
            }
        };

        let Some(name) = entry.file_name().to_str().map(|s| s.to_owned()) else {
            continue;
        };

        if entry.file_type().ok().map(|ft| !ft.is_dir()).unwrap_or(false) {
            continue;
        }

        let raw_info = match std::fs::read(entry.path().join("info.toml")) {
            Ok(buf) => buf,
            Err(_) => {
                continue;
            }
        };

        let info = match toml::from_slice::<Metadata>(&raw_info) {
            Ok(info) => info,
            Err(e) => {
                log::warn!("{}: {}", entry.path().display(), e);
                continue;
            }
        };

        let readme = std::fs::read_dir(entry.path())
            .ok()
            .and_then(|mut it| {
                it.find(|p| {
                    p.as_ref()
                        .map(|entry| entry.file_name().eq_ignore_ascii_case("readme"))
                        .unwrap_or(false)
                })
                .and_then(|r| r.ok())
            })
            .and_then(|entry| std::fs::read(entry.path()).ok())
            .map(|buf| String::from_utf8_lossy(&buf).to_string());

        let mut versions = std::collections::HashMap::new();
        for (v, version) in info.versions.into_iter() {
            let sv = match semver::Version::parse(&v) {
                Ok(sv) => sv,
                Err(e) => {
                    log::warn!("{}: {}", entry.path().display(), e);
                    continue;
                }
            };

            if sv.to_string() != v {
                log::warn!("{}: semver did not round trip", entry.path().display());
                continue;
            }

            let read_version_dir = match std::fs::read_dir(entry.path().join(format!("v{sv}"))) {
                Ok(read_version_dir) => read_version_dir,
                Err(e) => {
                    log::warn!("{}: {}", entry.path().display(), e);
                    continue;
                }
            };

            let mut supported_games = std::collections::HashSet::new();

            for entry in read_version_dir {
                let entry = match entry {
                    Ok(entry) => entry,
                    Err(e) => {
                        log::error!("failed to read dir: {:?}", e);
                        continue;
                    }
                };

                let filename = match entry.file_name().into_string() {
                    Ok(filename) => filename,
                    Err(e) => {
                        log::error!("failed to read dir: {:?}", e);
                        continue;
                    }
                };

                lazy_static::lazy_static! {
                    static ref PATCH_FILENAME_REGEX: regex::Regex =
                        regex::Regex::new(r"^(\S{4})_(\d{2}).bps$").unwrap();
                }

                let captures = match PATCH_FILENAME_REGEX.captures(&filename) {
                    Some(c) => c,
                    None => continue,
                };

                let rom_id = captures.get(1).unwrap().as_str().to_string();
                let revision = captures.get(2).unwrap().as_str().parse::<u8>().unwrap();

                let Some(game) = game::find_by_rom_info(rom_id.as_bytes().try_into().unwrap(), revision) else {
                    continue;
                };

                supported_games.insert(game);
            }

            versions.insert(
                sv,
                std::sync::Arc::new(Version {
                    rom_overrides: version.rom_overrides,
                    netplay_compatibility: version.netplay_compatibility,
                    supported_games,
                }),
            );
        }

        patches.insert(
            name.to_string(),
            std::sync::Arc::new(Patch {
                path: entry.path(),
                title: info.patch.title,
                authors: info
                    .patch
                    .authors
                    .into_iter()
                    .flat_map(|author| match mailparse::addrparse(&author) {
                        Ok(addrs) => addrs
                            .into_inner()
                            .into_iter()
                            .flat_map(|addr| match addr {
                                mailparse::MailAddr::Group(group) => group.addrs,
                                mailparse::MailAddr::Single(single) => vec![single],
                            })
                            .collect(),
                        Err(_) => vec![mailparse::SingleInfo {
                            display_name: Some(author),
                            addr: "".to_string(),
                        }],
                    })
                    .collect(),
                license: info.patch.license,
                readme,
                source: info.patch.source,
                versions,
            }),
        );
    }
    Ok(patches)
}

pub type PatchMap = std::collections::BTreeMap<String, std::sync::Arc<Patch>>;
pub type Scanner = scanner::Scanner<PatchMap>;

pub fn apply_patch_from_disk(
    rom: &[u8],
    game: &'static (dyn game::Game + Send + Sync),
    patches_path: &std::path::Path,
    patch_name: &str,
    patch_version: &semver::Version,
) -> Result<Vec<u8>, anyhow::Error> {
    let patch_name = std::path::Path::new(patch_name);
    if patch_name.components().count() > 1 {
        anyhow::bail!("attempted path traversal in patch name");
    }

    let (rom_code, revision) = game.gamedb_entry().rom_code_and_revision;
    let raw = std::fs::read(
        patches_path
            .join(patch_name)
            .join(format!("v{}", patch_version))
            .join(format!(
                "{}_{:02}.bps",
                std::str::from_utf8(rom_code).unwrap(),
                revision
            )),
    )?;
    Ok(bps::Patch::decode(&raw)?.apply(rom)?)
}
