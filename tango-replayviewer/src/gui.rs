use crate::{audio, config, fonts, graphics, patch, rom, session, stats};

mod memoize;
mod replay_dump_window;
mod replays_pane;
mod session_view;
mod ui_windows;

#[derive(Clone)]
pub struct Scanners {
    pub roms: rom::Scanner,
    pub patches: patch::Scanner,
}

impl Scanners {
    pub fn new(config: &config::Config) -> Self {
        let roms_scanner = rom::Scanner::new();
        let patches_scanner = patch::Scanner::new();

        let roms_path = config.roms_path.clone();
        let patches_path = config.patches_path.clone();

        roms_scanner.rescan(move || Some(crate::game::scan_roms(&roms_path)));
        patches_scanner.rescan(move || Some(patch::scan(&patches_path).unwrap_or_default()));

        Self {
            roms: roms_scanner,
            patches: patches_scanner,
        }
    }
}

pub struct SharedRootState {
    pub offscreen_ui: graphics::offscreen::OffscreenUi,
    pub event_loop_proxy: winit::event_loop::EventLoopProxy<crate::WindowRequest>,
    pub session: std::sync::Arc<parking_lot::Mutex<Option<session::Session>>>,
    pub scanners: Scanners,
    pub audio_binder: audio::LateBinder,
    pub fps_counter: std::sync::Arc<parking_lot::Mutex<stats::Counter>>,
    pub emu_tps_counter: std::sync::Arc<parking_lot::Mutex<stats::Counter>>,
    pub font_families: fonts::FontFamilies,
    pub ui_windows: ui_windows::UiWindows,
}

impl SharedRootState {
    pub fn send_window_request(&self, request: crate::WindowRequest) {
        let _ = self.event_loop_proxy.send_event(request);
    }
}

pub struct State {
    pub shared: SharedRootState,
    pub last_mouse_motion_time: Option<std::time::Instant>,
    replays_pane: replays_pane::State,
    session_view: Option<session_view::State>,
    themes: Themes,
    current_language: Option<unic_langid::LanguageIdentifier>,
}

impl State {
    pub fn new(
        event_loop_proxy: winit::event_loop::EventLoopProxy<crate::WindowRequest>,
        ctx: &egui::Context,
        config: &config::Config,
        audio_binder: audio::LateBinder,
        fps_counter: std::sync::Arc<parking_lot::Mutex<stats::Counter>>,
        emu_tps_counter: std::sync::Arc<parking_lot::Mutex<stats::Counter>>,
        scanners: Scanners,
    ) -> Result<Self, anyhow::Error> {
        let offscreen_ui = graphics::offscreen::OffscreenUi::new();

        let font_families = fonts::FontFamilies::new();
        let font_definitions = font_families.resolve_definitions(config.language.clone());
        ctx.set_fonts(font_definitions.clone());
        offscreen_ui.ctx().set_fonts(font_definitions);

        ctx.style_mut(|style| {
            style.spacing.scroll = egui::style::ScrollStyle::solid();
            style.animation_time = 0.0;
        });

        let mut replays_pane = replays_pane::State::new();
        replays_pane.rescan(ctx, &config.replays_path);

        Ok(Self {
            shared: SharedRootState {
                offscreen_ui,
                event_loop_proxy,
                session: std::sync::Arc::new(parking_lot::Mutex::new(None)),
                scanners,
                audio_binder,
                fps_counter,
                emu_tps_counter,
                font_families,
                ui_windows: Default::default(),
            },
            last_mouse_motion_time: None,
            replays_pane,
            session_view: None,
            themes: Themes {
                light: {
                    let mut visuals = egui::style::Visuals::light();
                    visuals.selection.bg_fill = egui::Color32::from_rgb(0x4c, 0xaf, 0x50);
                    visuals.selection.stroke.color = egui::Color32::BLACK;
                    visuals.faint_bg_color = egui::Color32::LIGHT_GRAY;
                    visuals
                },
                dark: {
                    let mut visuals = egui::style::Visuals::dark();
                    visuals.selection.bg_fill = egui::Color32::from_rgb(0x4c, 0xaf, 0x50);
                    visuals.selection.stroke.color = egui::Color32::WHITE;
                    visuals.faint_bg_color = egui::Color32::from_gray(14);
                    visuals.extreme_bg_color = egui::Color32::BLACK;
                    visuals
                },
            },
            current_language: None,
        })
    }
}

struct Themes {
    light: egui::style::Visuals,
    dark: egui::style::Visuals,
}

pub fn show(ctx: &egui::Context, config: &mut config::Config, state: &mut State) {
    {
        let mut session = state.shared.session.lock();
        if let Some(s) = session.as_ref() {
            if s.completed() {
                *session = None;
            }
        }
    }

    if state.current_language.as_ref() != Some(&config.language) {
        let language = config.language.clone();

        let font_definitions = state.shared.font_families.resolve_definitions(language);
        state.shared.offscreen_ui.ctx().set_fonts(font_definitions.clone());
        ctx.set_fonts(font_definitions);

        state.current_language = Some(config.language.clone());
    }

    let is_dark = matches!(config.theme, config::Theme::Dark);
    let visuals = if is_dark {
        state.themes.dark.clone()
    } else {
        state.themes.light.clone()
    };

    ctx.set_visuals(visuals.clone());
    state.shared.offscreen_ui.ctx().set_visuals(visuals);

    // ui windows can be present in both views (export dialog persists across views)
    let mut ui_windows = std::mem::take(&mut state.shared.ui_windows);
    ui_windows.show(ctx, config, &mut state.shared);
    std::mem::swap(&mut state.shared.ui_windows, &mut ui_windows);
    state.shared.ui_windows.merge(ui_windows);

    let session = state.shared.session.clone();
    let mut close_requested = false;
    {
        let session_guard = session.lock();
        if let Some(session) = session_guard.as_ref() {
            close_requested = session_view::show(
                ctx,
                config,
                &mut state.shared,
                session,
                &state.last_mouse_motion_time,
                state.session_view.get_or_insert_with(session_view::State::new),
            );
        } else {
            state.session_view = None;

            egui::CentralPanel::default().show(ctx, |ui| {
                replays_pane::show(ui, config, &mut state.shared, &mut state.replays_pane);
            });
        }
    }

    if close_requested {
        *state.shared.session.lock() = None;
    }
}
