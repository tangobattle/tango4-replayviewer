#![windows_subsystem = "windows"]

use clap::Parser;

#[macro_use]
extern crate lazy_static;

mod audio;
mod config;
mod fonts;
mod game;
mod graphics;
mod gui;
mod i18n;
mod patch;
mod rom;
mod scanner;
mod session;
mod stats;
mod sync;
mod video;

#[derive(clap::Parser)]
struct Args {
    /// Path to a folder containing replays. Defaults to ~/Documents/Tango/replays.
    #[clap(long)]
    replays: Option<std::path::PathBuf>,

    /// Path to a folder containing ROMs. Defaults to ~/Documents/Tango/roms.
    #[clap(long)]
    roms: Option<std::path::PathBuf>,

    /// Path to a folder containing patches. Defaults to ~/Documents/Tango/patches.
    #[clap(long)]
    patches: Option<std::path::PathBuf>,
}

pub enum WindowRequest {
    Repaint,
    SetFullscreen(Option<winit::window::Fullscreen>),
}

const DEFAULT_DATA_DIR_NAME: &str = "Tango";

fn default_data_dir() -> std::path::PathBuf {
    if let Some(docs) = dirs_document() {
        return docs.join(DEFAULT_DATA_DIR_NAME);
    }
    std::env::current_dir().unwrap_or_else(|_| std::path::PathBuf::from("."))
}

#[cfg(target_os = "windows")]
fn dirs_document() -> Option<std::path::PathBuf> {
    std::env::var_os("USERPROFILE").map(|p| std::path::PathBuf::from(p).join("Documents"))
}

#[cfg(not(target_os = "windows"))]
fn dirs_document() -> Option<std::path::PathBuf> {
    std::env::var_os("HOME").map(|p| std::path::PathBuf::from(p).join("Documents"))
}

fn main() -> Result<(), anyhow::Error> {
    let start_instant = std::time::Instant::now();
    let args = Args::parse();

    std::env::set_var("RUST_BACKTRACE", "1");

    env_logger::Builder::from_default_env()
        .filter(Some("tango"), log::LevelFilter::Info)
        .filter(Some("mgba"), log::LevelFilter::Info)
        .init();

    let data_dir = default_data_dir();
    let replays_path = args.replays.unwrap_or_else(|| data_dir.join("replays"));
    let roms_path = args.roms.unwrap_or_else(|| data_dir.join("roms"));
    let patches_path = args.patches.unwrap_or_else(|| data_dir.join("patches"));

    let _ = std::fs::create_dir_all(&replays_path);
    let _ = std::fs::create_dir_all(&roms_path);
    let _ = std::fs::create_dir_all(&patches_path);

    let config = config::Config::new(roms_path, patches_path, replays_path);

    let rt = tokio::runtime::Builder::new_multi_thread().enable_all().build()?;
    let _enter_guard = rt.enter();

    let event_loop = winit::event_loop::EventLoop::with_user_event().build().unwrap();

    let mut app = ReplayViewerApp::new(&event_loop, config, start_instant);
    event_loop.run_app(&mut app)?;

    Ok(())
}

struct ReplayViewerApp {
    config: config::Config,
    start_instant: std::time::Instant,
    event_loop_proxy: winit::event_loop::EventLoopProxy<WindowRequest>,
    audio_backend: Option<Box<dyn audio::Backend>>,
    gfx_backend: Option<Box<dyn graphics::Backend>>,
    gui_state: Option<gui::State>,
    scanners: Option<gui::Scanners>,
}

impl ReplayViewerApp {
    fn new(
        event_loop: &winit::event_loop::EventLoop<WindowRequest>,
        config: config::Config,
        start_instant: std::time::Instant,
    ) -> Self {
        let event_loop_proxy = event_loop.create_proxy();
        let scanners = gui::Scanners::new(&config);

        Self {
            start_instant,
            config,
            event_loop_proxy,
            audio_backend: None,
            gfx_backend: None,
            gui_state: None,
            scanners: Some(scanners),
        }
    }

    fn request_redraw(&mut self) {
        if let Some(gfx_backend) = &mut self.gfx_backend {
            gfx_backend.window().request_redraw();
        }
    }
}

impl winit::application::ApplicationHandler<WindowRequest> for ReplayViewerApp {
    fn resumed(&mut self, event_loop: &winit::event_loop::ActiveEventLoop) {
        let icon_image = image::load_from_memory(include_bytes!("icon.png")).unwrap();
        let icon_width = icon_image.width();
        let icon_height = icon_image.height();
        let icon = winit::window::Icon::from_rgba(icon_image.into_bytes(), icon_width, icon_height).unwrap();

        let window_attributes = winit::window::WindowAttributes::default()
            .with_title("Tango 4.x Replay Viewer")
            .with_window_icon(Some(icon))
            .with_inner_size(self.config.window_size)
            .with_min_inner_size(winit::dpi::PhysicalSize::new(
                mgba::gba::SCREEN_WIDTH,
                mgba::gba::SCREEN_HEIGHT,
            ));

        if let Some(gfx_backend) = &mut self.gfx_backend {
            gfx_backend.recreate_window(event_loop, window_attributes);
            return;
        };

        let gfx_backend: Box<dyn graphics::Backend> = match self.config.graphics_backend {
            #[cfg(feature = "glutin")]
            config::GraphicsBackend::Glutin => {
                Box::new(graphics::glutin::Backend::new(window_attributes, event_loop).unwrap())
            }
            #[cfg(feature = "wgpu")]
            config::GraphicsBackend::Wgpu => {
                Box::new(graphics::wgpu::Backend::new(window_attributes, event_loop).unwrap())
            }
        };

        let egui_ctx = gfx_backend.egui_ctx();
        egui_extras::install_image_loaders(egui_ctx);
        egui_ctx.set_zoom_factor(self.config.ui_scale_percent as f32 / 100.0);
        egui_ctx.set_request_repaint_callback({
            let el_proxy = self.event_loop_proxy.clone();
            move |_| {
                let _ = el_proxy.send_event(WindowRequest::Repaint);
            }
        });

        let mut audio_binder = audio::LateBinder::new();
        let audio_backend: Box<dyn audio::Backend> = match self.config.audio_backend {
            #[cfg(feature = "cpal")]
            config::AudioBackend::Cpal => Box::new(audio::cpal::Backend::new(audio_binder.clone()).unwrap()),
            #[cfg(feature = "sdl2-audio")]
            config::AudioBackend::Sdl2 => {
                let sdl = sdl2::init().unwrap();
                Box::new(audio::sdl2::Backend::new(&sdl, audio_binder.clone()).unwrap())
            }
        };
        audio_binder.set_sample_rate(audio_backend.sample_rate());

        self.audio_backend = Some(audio_backend);

        let fps_counter = std::sync::Arc::new(parking_lot::Mutex::new(stats::Counter::new(30)));
        let emu_tps_counter = std::sync::Arc::new(parking_lot::Mutex::new(stats::Counter::new(10)));

        self.gui_state = Some(
            gui::State::new(
                self.event_loop_proxy.clone(),
                egui_ctx,
                &self.config,
                audio_binder,
                fps_counter,
                emu_tps_counter,
                self.scanners.take().unwrap(),
            )
            .unwrap(),
        );

        self.gfx_backend = Some(gfx_backend);

        log::info!("launched in {:?}s", self.start_instant.elapsed().as_secs_f32());
    }

    fn window_event(
        &mut self,
        event_loop: &winit::event_loop::ActiveEventLoop,
        _: winit::window::WindowId,
        event: winit::event::WindowEvent,
    ) {
        let Some(gfx_backend) = self.gfx_backend.as_mut() else {
            return;
        };

        let gui_state = self.gui_state.as_mut().unwrap();

        match event {
            winit::event::WindowEvent::RedrawRequested => {
                let repaint_after = gfx_backend.run(&mut (|ctx| gui::show(ctx, &mut self.config, gui_state)));

                gfx_backend.paint();
                gui_state.shared.fps_counter.lock().mark();

                if repaint_after.is_zero() {
                    gfx_backend.window().request_redraw();
                    event_loop.set_control_flow(winit::event_loop::ControlFlow::Poll);
                } else if let Some(repaint_after_instant) = std::time::Instant::now().checked_add(repaint_after) {
                    event_loop.set_control_flow(winit::event_loop::ControlFlow::WaitUntil(repaint_after_instant));
                } else {
                    event_loop.set_control_flow(winit::event_loop::ControlFlow::Wait);
                }
            }
            winit::event::WindowEvent::MouseInput { .. } | winit::event::WindowEvent::CursorMoved { .. } => {
                gui_state.last_mouse_motion_time = Some(std::time::Instant::now());
                let _ = gfx_backend.on_window_event(&event);
                gfx_backend.window().request_redraw();
            }
            winit::event::WindowEvent::KeyboardInput {
                event:
                    winit::event::KeyEvent {
                        physical_key: winit::keyboard::PhysicalKey::Code(winit::keyboard::KeyCode::Escape),
                        state: winit::event::ElementState::Pressed,
                        ..
                    },
                ..
            } => {
                let mut session = gui_state.shared.session.lock();
                if session.is_some() {
                    *session = None;
                    gfx_backend.window().request_redraw();
                }
            }
            window_event => {
                if gfx_backend.on_window_event(&window_event).consumed {
                    gfx_backend.window().request_redraw();
                }

                match window_event {
                    winit::event::WindowEvent::CursorEntered { .. } => {
                        gui_state.last_mouse_motion_time = Some(std::time::Instant::now());
                    }
                    winit::event::WindowEvent::CursorLeft { .. } => {
                        gui_state.last_mouse_motion_time = None;
                    }
                    winit::event::WindowEvent::CloseRequested => {
                        event_loop.exit();
                        return;
                    }
                    _ => {}
                }
            }
        }

        if let Some(session) = gui_state.shared.session.lock().as_mut() {
            session.set_master_volume(self.config.volume);
        }

        self.config.window_size = gfx_backend
            .window()
            .inner_size()
            .to_logical(gfx_backend.window().scale_factor());
    }

    fn user_event(&mut self, _: &winit::event_loop::ActiveEventLoop, request: WindowRequest) {
        match request {
            WindowRequest::Repaint => self.request_redraw(),
            WindowRequest::SetFullscreen(value) => {
                if let Some(gfx_backend) = &self.gfx_backend {
                    gfx_backend.window().set_fullscreen(value)
                }
            }
        }
    }

    fn exiting(&mut self, ev: &winit::event_loop::ActiveEventLoop) {
        let is_wayland = {
            #[cfg(target_os = "linux")]
            {
                use winit::platform::wayland::ActiveEventLoopExtWayland;
                ev.is_wayland()
            }

            #[cfg(not(target_os = "linux"))]
            {
                let _ = ev;
                false
            }
        };

        if let Some(backend) = &mut self.gfx_backend {
            backend.exiting();
            if backend.should_take_on_exit() || is_wayland {
                self.gfx_backend.take();
            }
        }
    }
}
