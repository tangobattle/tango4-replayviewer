use crate::{config, gui, session, video};
mod replay_controls_window;

pub struct State {
    vbuf: Option<VBuf>,
}

impl State {
    pub fn new() -> State {
        Self { vbuf: None }
    }
}

struct VBuf {
    image: egui::ColorImage,
    texture: egui::TextureHandle,
}

impl VBuf {
    fn new(ctx: &egui::Context, width: usize, height: usize) -> Self {
        VBuf {
            image: egui::ColorImage::new([width, height], egui::Color32::BLACK),
            texture: ctx.load_texture(
                "vbuf",
                egui::ColorImage::new([width, height], egui::Color32::BLACK),
                egui::TextureOptions::NEAREST,
            ),
        }
    }
}

fn show_emulator(
    ui: &mut egui::Ui,
    session: &session::Session,
    video_filter: &str,
    max_scale: u32,
    integer_scaling: bool,
    vbuf: &mut Option<VBuf>,
) {
    let video_filter = video::filter_by_name(video_filter).unwrap_or(Box::new(video::NullFilter));

    let [vbuf_width, vbuf_height] =
        video_filter.output_size([mgba::gba::SCREEN_WIDTH as usize, mgba::gba::SCREEN_HEIGHT as usize]);

    let vbuf = if !vbuf
        .as_ref()
        .map(|vbuf| vbuf.texture.size() == [vbuf_width, vbuf_height])
        .unwrap_or(false)
    {
        log::info!("vbuf reallocation: ({}, {})", vbuf_width, vbuf_height);
        vbuf.insert(VBuf::new(ui.ctx(), vbuf_width, vbuf_height))
    } else {
        vbuf.as_mut().unwrap()
    };

    video_filter.apply(
        &session.lock_vbuf(),
        bytemuck::cast_slice_mut(&mut vbuf.image.pixels[..]),
        [mgba::gba::SCREEN_WIDTH as usize, mgba::gba::SCREEN_HEIGHT as usize],
    );

    vbuf.texture.set(vbuf.image.clone(), egui::TextureOptions::NEAREST);

    let gba_screen_size = egui::Vec2::new(mgba::gba::SCREEN_WIDTH as _, mgba::gba::SCREEN_HEIGHT as _);
    let pixels_per_point = ui.ctx().pixels_per_point();
    let mut scaling_factor: f32 = egui::Vec2::min_elem(ui.available_size() * pixels_per_point / gba_screen_size);

    if integer_scaling {
        scaling_factor = scaling_factor.floor();
    }

    scaling_factor = scaling_factor.max(1.0);

    if max_scale > 0 {
        scaling_factor = scaling_factor.min(max_scale as _);
    }

    let scaled_size = gba_screen_size * scaling_factor / pixels_per_point;
    let center = ui.available_size() * 0.5 + ui.cursor().left_top().to_vec2();
    let center = (center * pixels_per_point).floor() / pixels_per_point;
    let rect = egui::Rect::from_center_size(center.to_pos2(), scaled_size);

    ui.put(rect, egui::Image::new((vbuf.texture.id(), scaled_size)));
    ui.ctx().request_repaint();
}

/// Returns true if the user requested closing the replay (X button).
pub fn show(
    ctx: &egui::Context,
    config: &config::Config,
    _shared_root_state: &mut gui::SharedRootState,
    session: &session::Session,
    last_mouse_motion_time: &Option<std::time::Instant>,
    state: &mut State,
) -> bool {
    let language = &config.language;
    let video_filter = &config.video_filter;
    let integer_scaling = config.integer_scaling;
    let max_scale = config.max_scale;

    let close_requested = replay_controls_window::show(ctx, session, language, last_mouse_motion_time);

    if let Some(thread_handle) = session.has_crashed() {
        let mut audio_guard = thread_handle.lock_audio();
        let core = audio_guard.core_mut();
        log::error!(
            r#"mgba thread crashed @ thumb pc = {:08x}!
 r0 = {:08x},  r1 = {:08x},  r2 = {:08x},  r3 = {:08x},
 r4 = {:08x},  r5 = {:08x},  r6 = {:08x},  r7 = {:08x},
 r8 = {:08x},  r9 = {:08x}, r10 = {:08x}, r11 = {:08x},
r12 = {:08x}, r13 = {:08x}, r14 = {:08x}, r15 = {:08x},
cpsr = {:08x}"#,
            core.as_ref().gba().cpu().thumb_pc(),
            core.as_ref().gba().cpu().gpr(0),
            core.as_ref().gba().cpu().gpr(1),
            core.as_ref().gba().cpu().gpr(2),
            core.as_ref().gba().cpu().gpr(3),
            core.as_ref().gba().cpu().gpr(4),
            core.as_ref().gba().cpu().gpr(5),
            core.as_ref().gba().cpu().gpr(6),
            core.as_ref().gba().cpu().gpr(7),
            core.as_ref().gba().cpu().gpr(8),
            core.as_ref().gba().cpu().gpr(9),
            core.as_ref().gba().cpu().gpr(10),
            core.as_ref().gba().cpu().gpr(11),
            core.as_ref().gba().cpu().gpr(12),
            core.as_ref().gba().cpu().gpr(13),
            core.as_ref().gba().cpu().gpr(14),
            core.as_ref().gba().cpu().gpr(15),
            core.as_ref().gba().cpu().cpsr(),
        );
        panic!("not possible to proceed any further! aborting!");
    }

    egui::CentralPanel::default()
        .frame(egui::Frame::new().fill(egui::Color32::BLACK))
        .show(ctx, |ui| {
            ui.with_layout(
                egui::Layout::centered_and_justified(egui::Direction::LeftToRight),
                |ui| {
                    show_emulator(ui, session, video_filter, max_scale, integer_scaling, &mut state.vbuf);
                },
            );
        });

    close_requested
}
