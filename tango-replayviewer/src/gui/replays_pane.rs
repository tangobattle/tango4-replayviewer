use super::{memoize::ResultCacheSingle, replay_dump_window::ReplayDumpWindow};
use crate::{config, game, gui, i18n, patch, scanner, session};
use fluent_templates::Loader;
use itertools::Itertools;
use std::{borrow::Cow, rc::Rc, sync::Arc};
use tango_pvp::replay::Replay;

struct CachedData {
    replay: Replay,
    patch: Option<(String, semver::Version, Arc<crate::patch::Version>)>,
    local_rom: Vec<u8>,
    remote_rom: Option<Vec<u8>>,
}

pub struct State {
    replays_scanner: scanner::Scanner<Vec<(std::path::PathBuf, bool, tango_pvp::replay::Metadata)>>,
    selection: Option<std::ops::Range<usize>>,
    folder_filter: Option<std::path::PathBuf>,
    replay_cache: ResultCacheSingle<std::path::PathBuf, Option<Rc<CachedData>>>,
}

impl State {
    pub fn new() -> Self {
        Self {
            selection: None,
            replays_scanner: scanner::Scanner::new(),
            folder_filter: None,
            replay_cache: Default::default(),
        }
    }

    fn update_selection(&mut self, i: usize, multi_select: bool) {
        if multi_select {
            if let Some(range) = &mut self.selection {
                if i < range.start {
                    range.start = i;
                } else if i + 1 > range.end {
                    range.end = i + 1;
                }

                return;
            }
        }

        let new_selection = Some(i..i + 1);

        if self.selection == new_selection {
            self.selection = None;
            return;
        }

        self.selection = new_selection;
    }

    pub fn rescan(&self, ctx: &egui::Context, replays_path: &std::path::Path) {
        tokio::task::spawn_blocking({
            let replays_scanner = self.replays_scanner.clone();
            let replays_path = replays_path.to_path_buf();
            let egui_ctx = ctx.clone();
            move || {
                replays_scanner.rescan(move || {
                    let mut replays = vec![];
                    for entry in walkdir::WalkDir::new(&replays_path) {
                        let entry = match entry {
                            Ok(entry) => entry,
                            Err(_) => {
                                continue;
                            }
                        };

                        if !entry.file_type().is_file() {
                            continue;
                        }

                        let path = entry.path();
                        let mut f = match std::fs::File::open(path) {
                            Ok(f) => f,
                            Err(_) => {
                                continue;
                            }
                        };

                        let (num_inputs, metadata) = match tango_pvp::replay::read_metadata(&mut f) {
                            Ok((n, metadata)) => (n, metadata),
                            Err(_) => {
                                continue;
                            }
                        };

                        replays.push((path.to_path_buf(), num_inputs > 0, metadata));
                    }
                    replays.sort_by_key(|(_, _, metadata)| {
                        (
                            std::cmp::Reverse(metadata.ts),
                            metadata.link_code.clone(),
                            metadata.round,
                        )
                    });
                    Some(replays)
                });
                egui_ctx.request_repaint();
            }
        });
    }
}

fn format_path(replays_path: &std::path::Path, path: &std::path::Path) -> String {
    let string = path.strip_prefix(replays_path).unwrap_or(path).to_string_lossy();

    if string.is_empty() {
        String::from("/")
    } else {
        format!("/{string}/")
    }
}

fn resolve_cached<'a>(
    replays_path: &std::path::Path,
    patches_path: &std::path::Path,
    roms: &std::collections::HashMap<&'static (dyn game::Game + Send + Sync), Vec<u8>>,
    patches: &patch::PatchMap,
    cache: &'a mut ResultCacheSingle<std::path::PathBuf, Option<Rc<CachedData>>>,
    path: &std::path::Path,
    metadata: &tango_pvp::replay::Metadata,
    local_game: &'static (dyn game::Game + Send + Sync),
    local_game_info: &tango_pvp::replay::metadata::GameInfo,
) -> Option<Rc<CachedData>> {
    let _ = replays_path;
    cache.calculate(path.to_path_buf(), |path| {
        let remote_side = metadata.remote_side.as_ref()?;
        let remote_game_info = remote_side.game_info.as_ref()?;

        let remote_game = game::find_by_family_and_variant(
            remote_game_info.rom_family.as_str(),
            remote_game_info.rom_variant as u8,
        )?;

        let mut f = match std::fs::File::open(&path) {
            Ok(f) => f,
            Err(e) => {
                log::error!("failed to load replay {}: {:?}", path.display(), e);
                return None;
            }
        };

        let replay = match tango_pvp::replay::Replay::decode(&mut f) {
            Ok(replay) => replay,
            Err(e) => {
                log::error!("failed to load replay {}: {:?}", path.display(), e);
                return None;
            }
        };

        let mut local_rom = roms.get(&local_game).cloned()?;

        let patch = if let Some(patch_info) = local_game_info.patch.as_ref() {
            let patch = patches.get(&patch_info.name)?;
            let version = semver::Version::parse(&patch_info.version).ok()?;
            let version_meta = patch.versions.get(&version)?;

            local_rom = match patch::apply_patch_from_disk(
                &local_rom,
                local_game,
                patches_path,
                &patch_info.name,
                &version,
            ) {
                Ok(r) => r,
                Err(e) => {
                    log::error!("failed to apply patch {}: {:?}", patch_info.name, e);
                    return None;
                }
            };

            Some((patch_info.name.clone(), version, version_meta.clone()))
        } else {
            None
        };

        let remote_rom = roms.get(&remote_game).and_then(|rom| {
            let mut rom = rom.clone();

            if let Some(patch_info) = remote_game_info.patch.as_ref() {
                let version = semver::Version::parse(&patch_info.version).ok()?;

                rom = match patch::apply_patch_from_disk(
                    &rom,
                    remote_game,
                    patches_path,
                    &patch_info.name,
                    &version,
                ) {
                    Ok(r) => r,
                    Err(e) => {
                        log::error!("failed to apply remote patch {}: {:?}", patch_info.name, e);
                        return None;
                    }
                };
            }

            Some(rom)
        });

        Some(Rc::new(CachedData {
            replay,
            local_rom,
            remote_rom,
            patch,
        }))
    })
}

pub fn show(
    ui: &mut egui::Ui,
    config: &config::Config,
    shared_root_state: &mut gui::SharedRootState,
    state: &mut State,
) {
    let language = &config.language;
    let patches_path = &config.patches_path;
    let replays_path = &config.replays_path;

    let roms_scanner = shared_root_state.scanners.roms.clone();
    let patches_scanner = shared_root_state.scanners.patches.clone();
    let roms = roms_scanner.read();
    let patches = patches_scanner.read();

    let max_dropdown_height = ui.available_height();

    // pre-resolve cached data for the current selection (so the action buttons in the top bar
    // can act on it without needing the right panel)
    let cached_for_selection: Option<(
        Rc<CachedData>,
        &'static (dyn game::Game + Send + Sync),
        std::path::PathBuf,
        std::ops::Range<usize>,
    )> = {
        let replays = state.replays_scanner.read();
        state.selection.as_ref().and_then(|selection| {
            let (path, _, metadata) = replays.get(selection.start)?;
            let local_side = metadata.local_side.as_ref()?;
            let local_game_info = local_side.game_info.as_ref()?;
            let local_game = game::find_by_family_and_variant(
                local_game_info.rom_family.as_str(),
                local_game_info.rom_variant as u8,
            )?;
            let cached = resolve_cached(
                replays_path,
                patches_path,
                &roms,
                &patches,
                &mut state.replay_cache,
                path,
                metadata,
                local_game,
                local_game_info,
            )?;
            Some((cached, local_game, path.clone(), selection.clone()))
        })
    };

    // top bar: folder filter on the left, action buttons on the right
    egui::Frame::default()
        .inner_margin(egui::Margin::symmetric(8, 4))
        .show(ui, |ui| {
            ui.horizontal(|ui| {
                let default_label = i18n::LOCALES.lookup(language, "replays-all-replays").unwrap();

                egui::ComboBox::from_id_salt("game-select-combobox")
                    .selected_text(
                        state
                            .folder_filter
                            .as_ref()
                            .map(|path| Cow::Owned(format_path(replays_path, path)))
                            .unwrap_or(Cow::Borrowed(default_label.as_str())),
                    )
                    .wrap()
                    .height(max_dropdown_height)
                    .show_ui(ui, |ui| {
                        const CHAR_WIDTH: f32 = 6.5;

                        let replays = state.replays_scanner.read();
                        let mut parent_folders = replays
                            .iter()
                            .flat_map(|(path, _, _)| path.parent())
                            .unique()
                            .map(|path| (path, format_path(replays_path, path)))
                            .collect::<Vec<_>>();

                        parent_folders.sort_by(|(_, a), (_, b)| a.cmp(b));

                        let mut max_width: f32 = default_label.len() as f32 * CHAR_WIDTH;
                        for (_, path_str) in &parent_folders {
                            max_width = max_width.max(path_str.len() as f32 * CHAR_WIDTH);
                        }
                        ui.allocate_space(egui::Vec2::new(max_width, 0.0));

                        if ui.selectable_label(false, default_label.as_str()).clicked() {
                            state.folder_filter = None;
                        }

                        for (path, path_str) in parent_folders {
                            if ui.selectable_label(false, path_str).clicked() {
                                state.folder_filter = Some(path.to_path_buf());
                            }
                        }
                    });

                ui.with_layout(egui::Layout::right_to_left(egui::Align::Center), |ui| {
                    let has_selection = cached_for_selection.is_some();
                    let export_label_id = cached_for_selection
                        .as_ref()
                        .map(|(_, _, _, sel)| if sel.len() == 1 { "replays-export" } else { "replays-export-multi" })
                        .unwrap_or("replays-export");
                    let export_label =
                        format!("💾 {}", i18n::LOCALES.lookup(language, export_label_id).unwrap());
                    let play_label = format!("▶️ {}", i18n::LOCALES.lookup(language, "replays-play").unwrap());

                    if ui.add_enabled(has_selection, egui::Button::new(export_label)).clicked() {
                        if let Some((cached, _, path, selection)) = &cached_for_selection {
                            let replays = state.replays_scanner.read();
                            let replays_to_render = replays[selection.clone()]
                                .iter()
                                .rev()
                                .flat_map(|(p, _, _)| {
                                    let mut f = std::fs::File::open(p).ok()?;
                                    tango_pvp::replay::Replay::decode(&mut f).ok()
                                })
                                .collect();

                            let mut save_path = if let Some(folder) = &config.last_export_folder {
                                let mut save_path = folder.clone();
                                save_path.push(path.file_name().unwrap());
                                save_path
                            } else {
                                path.clone()
                            };

                            if selection.len() > 1 {
                                save_path.set_extension("multi.mp4");
                            } else {
                                save_path.set_extension("mp4");
                            }

                            let mut window = ReplayDumpWindow::new(
                                cached.local_rom.clone(),
                                cached.remote_rom.clone(),
                                replays_to_render,
                                save_path,
                            );
                            shared_root_state
                                .ui_windows
                                .push(move |id, ctx, config, _| window.show(id, ctx, config));
                        }
                    }

                    if ui.add_enabled(has_selection, egui::Button::new(play_label)).clicked() {
                        if let Some((cached, local_game, _, _)) = &cached_for_selection {
                            let egui_ctx = ui.ctx().clone();
                            let audio_binder = shared_root_state.audio_binder.clone();
                            let patch = cached
                                .patch
                                .as_ref()
                                .map(|(name, version, _)| (name.clone(), version.clone()));
                            let rom = cached.local_rom.clone();
                            let emu_tps_counter = shared_root_state.emu_tps_counter.clone();
                            let replay = cached.replay.clone();
                            let session = shared_root_state.session.clone();
                            let game = *local_game;

                            tokio::task::spawn_blocking(move || {
                                *session.lock() = Some(
                                    session::Session::new_replayer(
                                        audio_binder,
                                        game,
                                        patch,
                                        &rom,
                                        emu_tps_counter,
                                        &replay,
                                    )
                                    .unwrap(),
                                );
                                egui_ctx.request_repaint();
                            });
                        }
                    }
                });
            });
        });

    ui.separator();

    // full-width replay list (no right panel anymore)
    egui::ScrollArea::vertical()
        .auto_shrink([false, false])
        .id_salt("replays-list")
        .show(ui, |ui| {
            if state.replays_scanner.is_scanning() {
                ui.horizontal(|ui| {
                    ui.spinner();
                    ui.label(i18n::LOCALES.lookup(language, "replays-scanning").unwrap());
                });
                return;
            }

            let replays = state.replays_scanner.read();
            let mut clicked_index = None;

            ui.with_layout(egui::Layout::top_down_justified(egui::Align::LEFT), |ui| {
                let mut last_fingerprint = None;
                let mut alternate = true;

                let default_spacing = ui.style().spacing.item_spacing;
                ui.style_mut().spacing.item_spacing = Default::default();

                let folder_filter = state.folder_filter.as_ref();

                for (i, (path, _, metadata)) in replays.iter().enumerate() {
                    if folder_filter.is_some_and(|filter| path.parent().is_some_and(|parent| parent != filter)) {
                        continue;
                    }

                    let Some(ts) = std::time::UNIX_EPOCH.checked_add(std::time::Duration::from_millis(metadata.ts))
                    else {
                        continue;
                    };

                    let Some(local_side) = metadata.local_side.as_ref() else {
                        continue;
                    };

                    let Some(remote_side) = metadata.remote_side.as_ref() else {
                        continue;
                    };

                    let Some(local_game_info) = local_side.game_info.as_ref() else {
                        continue;
                    };

                    let Some(remote_game_info) = remote_side.game_info.as_ref() else {
                        continue;
                    };

                    let Some(local_game) = game::find_by_family_and_variant(
                        local_game_info.rom_family.as_str(),
                        local_game_info.rom_variant as u8,
                    ) else {
                        continue;
                    };

                    let fingerprint =
                        Some((&metadata.link_code, local_game_info, remote_game_info, &remote_side.nickname));

                    if fingerprint != last_fingerprint {
                        alternate = !alternate;
                        last_fingerprint = fingerprint;
                    }

                    let mut frame = egui::Frame::default().inner_margin(egui::Margin {
                        left: default_spacing.x as i8,
                        right: default_spacing.x as i8,
                        top: 2,
                        bottom: 2,
                    });

                    if alternate {
                        frame = frame.fill(ui.ctx().style().visuals.faint_bg_color);
                    }

                    frame.show(ui, |ui| {
                        let text_body_style = ui.style().text_styles.get(&egui::TextStyle::Body).unwrap();
                        let text_small_style = ui.style().text_styles.get(&egui::TextStyle::Small).unwrap();

                        let selected = state.selection.as_ref().is_some_and(|r| r.contains(&i));

                        let text_color = if selected {
                            ui.ctx().style().visuals.selection.stroke.color
                        } else {
                            ui.visuals().text_color()
                        };

                        let mut layout_job = egui::text::LayoutJob::default();
                        layout_job.append(
                            &chrono::DateTime::<chrono::Local>::from(ts).to_string(),
                            0.0,
                            egui::TextFormat::simple(text_body_style.clone(), text_color),
                        );
                        layout_job.append(
                            "    ",
                            0.0,
                            egui::TextFormat::simple(text_small_style.clone(), text_color),
                        );
                        layout_job.append(
                            &i18n::LOCALES
                                .lookup_with_args(
                                    language,
                                    "replay-subtitle",
                                    &std::collections::HashMap::from([
                                        (
                                            "game_family",
                                            i18n::LOCALES
                                                .lookup(
                                                    language,
                                                    &format!(
                                                        "game-{}.short",
                                                        local_game.gamedb_entry().family_and_variant.0
                                                    ),
                                                )
                                                .unwrap_or_else(|| {
                                                    local_game.gamedb_entry().family_and_variant.0.to_string()
                                                })
                                                .into(),
                                        ),
                                        ("link_code", metadata.link_code.clone().into()),
                                        ("nickname", remote_side.nickname.clone().into()),
                                    ]),
                                )
                                .unwrap(),
                            0.0,
                            egui::TextFormat::simple(text_small_style.clone(), text_color),
                        );

                        if ui.selectable_label(selected, layout_job).clicked() {
                            clicked_index = Some(i);
                        }
                    });
                }
            });

            std::mem::drop(replays);

            if let Some(i) = clicked_index {
                let shift_held = ui.input(|i| i.modifiers.shift);
                state.update_selection(i, shift_held);
            }
        });
}
