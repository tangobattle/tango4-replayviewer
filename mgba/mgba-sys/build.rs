extern crate bindgen;

use std::env;
use std::io::BufRead;
use std::path::{Path, PathBuf};

/// Pull the `-D…` flags cmake fed to the mgba C compile out of whatever
/// per-generator layout cmake produced this time:
///
/// * Makefile-style generators (NMake / Unix Makefiles / MinGW Makefiles)
///   write `build/CMakeFiles/mgba.dir/flags.make` with a literal
///   `C_DEFINES = -Dfoo -Dbar` line.
/// * Visual Studio generators write `build/mgba.vcxproj` (XML) with one
///   `<PreprocessorDefinitions>FOO;BAR;%(PreprocessorDefinitions)</…>`
///   element per build config. We grab the first non-empty one — the
///   defines don't differ meaningfully across Debug/Release for the
///   bindgen-visible header set.
fn extract_c_defines(build_dir: &Path) -> Option<Vec<String>> {
    let flags_make = build_dir.join("CMakeFiles").join("mgba.dir").join("flags.make");
    if flags_make.exists() {
        return extract_from_flags_make(&flags_make);
    }
    let vcxproj = build_dir.join("mgba.vcxproj");
    if vcxproj.exists() {
        return extract_from_vcxproj(&vcxproj);
    }
    None
}

fn extract_from_flags_make(path: &Path) -> Option<Vec<String>> {
    let file = std::fs::File::open(path).ok()?;
    let mut flags = None;
    for line in std::io::BufReader::new(file).lines() {
        let line = line.ok()?;
        if let Some(rest) = line.strip_prefix("C_DEFINES = ") {
            flags = Some(shell_words::split(rest).ok()?);
        }
    }
    flags
}

fn extract_from_vcxproj(path: &Path) -> Option<Vec<String>> {
    // The vcxproj is one big XML blob; rather than dragging in a full
    // parser, slice between the first non-empty <PreprocessorDefinitions>
    // open/close tag pair. Configs share the same defines for mgba so
    // first-match is fine.
    let content = std::fs::read_to_string(path).ok()?;
    const OPEN: &str = "<PreprocessorDefinitions>";
    const CLOSE: &str = "</PreprocessorDefinitions>";
    let mut cursor = 0;
    while let Some(start) = content[cursor..].find(OPEN) {
        let abs_start = cursor + start + OPEN.len();
        let end = content[abs_start..].find(CLOSE)?;
        let raw = &content[abs_start..abs_start + end];
        let flags: Vec<String> = raw
            .split(';')
            .map(str::trim)
            .filter(|s| !s.is_empty() && !s.starts_with("%("))
            .map(|s| format!("-D{s}"))
            .collect();
        if !flags.is_empty() {
            return Some(flags);
        }
        cursor = abs_start + end + CLOSE.len();
    }
    None
}

#[derive(Debug)]
struct IgnoreMacros(std::collections::HashSet<String>);

impl bindgen::callbacks::ParseCallbacks for IgnoreMacros {
    fn will_parse_macro(&self, name: &str) -> bindgen::callbacks::MacroParsingBehavior {
        if self.0.contains(name) {
            bindgen::callbacks::MacroParsingBehavior::Ignore
        } else {
            bindgen::callbacks::MacroParsingBehavior::Default
        }
    }
}

fn main() {
    let target_os = env::var("CARGO_CFG_TARGET_OS").unwrap();

    let mut cfg = cmake::Config::new("mgba");
    cfg.define("LIBMGBA_ONLY", "on");

    let mgba_dst = cfg.build();

    // Makefile generators (NMake / Unix / MinGW) output directly under
    // `build/`; the Visual Studio generator buries artifacts in a
    // per-config subdir (`build/Release/` for cargo release builds).
    // Emit both so cargo's link-search picks up whichever actually
    // contains `mgba.lib` / `libmgba.a`.
    let build_dir = mgba_dst.join("build");
    println!("cargo:rustc-link-search=native={}", build_dir.display());
    for config in ["Release", "Debug", "MinSizeRel", "RelWithDebInfo"] {
        println!("cargo:rustc-link-search=native={}/{}", build_dir.display(), config);
    }
    println!("cargo:rustc-link-lib=static=mgba");
    match target_os.as_str() {
        "macos" => {
            println!("cargo:rustc-link-lib=framework=Cocoa");
        }
        "windows" => {
            println!("cargo:rustc-link-lib=shlwapi");
            println!("cargo:rustc-link-lib=ole32");
            println!("cargo:rustc-link-lib=uuid");
        }
        "linux" => {}
        tos => panic!("unknown target os {:?}!", tos),
    }
    println!("cargo:rerun-if-changed=wrapper.h");
    let ignored_macros = IgnoreMacros(
        vec![
            "FP_INFINITE".into(),
            "FP_NAN".into(),
            "FP_NORMAL".into(),
            "FP_SUBNORMAL".into(),
            "FP_ZERO".into(),
            "FP_INT_UPWARD".into(),
            "FP_INT_DOWNWARD".into(),
            "FP_INT_TOWARDZERO".into(),
            "FP_INT_TONEARESTFROMZERO".into(),
            "FP_INT_TONEAREST".into(),
            "IPPORT_RESERVED".into(),
        ]
        .into_iter()
        .collect(),
    );

    let flags = extract_c_defines(&build_dir).expect("could not extract C_DEFINES from cmake build");

    let bindings = bindgen::Builder::default()
        .header("wrapper.h")
        .clang_args(&["-Imgba/include", "-D__STDC_NO_THREADS__=1"])
        .clang_args(flags)
        .blocklist_item("__mingw_ldbl_type_t")
        // .parse_callbacks(Box::new(bindgen::CargoCallbacks)) // TODO: support this again
        .parse_callbacks(Box::new(ignored_macros))
        .generate()
        .expect("Unable to generate bindings");
    let out_path = PathBuf::from(env::var("OUT_DIR").unwrap());
    bindings
        .write_to_file(out_path.join("bindings.rs"))
        .expect("Couldn't write bindings!");
}
