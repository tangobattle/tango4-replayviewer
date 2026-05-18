use crate::i18n;

#[derive(Clone, PartialEq, Eq)]
pub enum GraphicsBackend {
    #[cfg(feature = "glutin")]
    Glutin,
    #[cfg(feature = "wgpu")]
    Wgpu,
}

impl Default for GraphicsBackend {
    #[allow(unreachable_code)]
    fn default() -> Self {
        #[cfg(feature = "glutin")]
        return Self::Glutin;
        #[cfg(feature = "wgpu")]
        return Self::Wgpu;
    }
}

#[derive(Clone, PartialEq, Eq)]
pub enum AudioBackend {
    #[cfg(feature = "sdl2-audio")]
    Sdl2,
    #[cfg(feature = "cpal")]
    Cpal,
}

impl Default for AudioBackend {
    #[allow(unreachable_code)]
    fn default() -> Self {
        #[cfg(feature = "sdl2-audio")]
        return Self::Sdl2;
        #[cfg(feature = "cpal")]
        return Self::Cpal;
    }
}

#[derive(Default, Clone, PartialEq, Eq)]
pub enum Theme {
    #[default]
    Dark,
    Light,
}

#[derive(Clone, PartialEq, Eq)]
pub struct Config {
    pub language: unic_langid::LanguageIdentifier,
    pub theme: Theme,
    pub video_filter: String,
    pub max_scale: u32,
    pub integer_scaling: bool,
    pub roms_path: std::path::PathBuf,
    pub patches_path: std::path::PathBuf,
    pub replays_path: std::path::PathBuf,
    pub last_export_folder: Option<std::path::PathBuf>,
    pub graphics_backend: GraphicsBackend,
    pub audio_backend: AudioBackend,
    pub volume: i32,
    pub ui_scale_percent: u32,
    pub speed_change_percent: u32,
    pub full_screen: bool,
    pub window_size: winit::dpi::LogicalSize<u32>,
}

impl Config {
    pub fn new(
        roms_path: std::path::PathBuf,
        patches_path: std::path::PathBuf,
        replays_path: std::path::PathBuf,
    ) -> Self {
        Self {
            language: i18n::FALLBACK_LANG.clone(),
            theme: Theme::Dark,
            video_filter: "".to_string(),
            max_scale: 0,
            integer_scaling: false,
            roms_path,
            patches_path,
            replays_path,
            last_export_folder: None,
            graphics_backend: GraphicsBackend::default(),
            audio_backend: AudioBackend::default(),
            volume: 0x100,
            ui_scale_percent: 100,
            speed_change_percent: 300,
            full_screen: false,
            window_size: winit::dpi::LogicalSize::new(mgba::gba::SCREEN_WIDTH * 3, mgba::gba::SCREEN_HEIGHT * 3),
        }
    }
}
