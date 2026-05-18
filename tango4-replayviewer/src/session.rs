use crate::{audio, game, stats, video};
use parking_lot::Mutex;
use std::sync::Arc;

pub const EXPECTED_FPS: f32 = 16777216.0 / 280896.0;

pub struct GameInfo {
    pub game: &'static (dyn game::Game + Send + Sync),
    pub patch: Option<(String, semver::Version)>,
}

pub struct Session {
    start_time: std::time::SystemTime,
    game_info: GameInfo,
    vbuf: std::sync::Arc<Mutex<Vec<u8>>>,
    _audio_binding: audio::Binding,
    thread: mgba::thread::Thread,
    completion_token: tango_pvp::hooks::CompletionToken,
    pause_on_next_frame: std::sync::Arc<std::sync::atomic::AtomicBool>,
}

impl Session {
    pub fn new_replayer(
        audio_binder: audio::LateBinder,
        game: &'static (dyn game::Game + Send + Sync),
        patch: Option<(String, semver::Version)>,
        rom: &[u8],
        emu_tps_counter: Arc<Mutex<stats::Counter>>,
        replay: &tango_pvp::replay::Replay,
    ) -> Result<Self, anyhow::Error> {
        let mut core = mgba::core::Core::new_gba("tango")?;
        core.enable_video_buffer();

        core.as_mut().load_rom(mgba::vfile::VFile::from_vec(rom.to_vec()))?;

        let hooks = tango_pvp::hooks::hooks_for_gamedb_entry(game.gamedb_entry()).unwrap();
        hooks.patch(core.as_mut());

        let completion_token = tango_pvp::hooks::CompletionToken::new();

        let replay_is_complete = replay.is_complete;
        let input_pairs = replay.input_pairs.clone();
        let stepper_state = tango_pvp::stepper::State::new(
            (replay.metadata.match_type as u8, replay.metadata.match_subtype as u8),
            replay.local_player_index,
            input_pairs.clone(),
            0,
            Box::new({
                let completion_token = completion_token.clone();
                move || {
                    completion_token.complete();
                }
            }),
        );
        let mut traps = hooks.common_traps();
        traps.extend(hooks.stepper_traps(stepper_state.clone()));
        traps.extend(hooks.stepper_replay_traps());
        core.set_traps(traps);

        let thread = mgba::thread::Thread::new(core);

        thread.start()?;
        thread.handle().pause();
        thread.handle().lock_audio().sync_mut().set_fps_target(EXPECTED_FPS);

        let audio_binding = audio_binder.bind(Some(Box::new(audio::MGBAStream::new(
            thread.handle(),
            audio_binder.sample_rate(),
        ))))?;

        let local_state = replay.local_state.clone();
        thread.handle().run_on_core(move |mut core| {
            core.load_state(&local_state).expect("load state");
        });
        thread.handle().unpause();

        let pause_on_next_frame = std::sync::Arc::new(std::sync::atomic::AtomicBool::new(false));
        let vbuf = Arc::new(Mutex::new(vec![
            0u8;
            (mgba::gba::SCREEN_WIDTH * mgba::gba::SCREEN_HEIGHT * 4)
                as usize
        ]));
        thread.set_frame_callback({
            let vbuf = vbuf.clone();
            let emu_tps_counter = emu_tps_counter.clone();
            let completion_token = completion_token.clone();
            let stepper_state = stepper_state.clone();
            let pause_on_next_frame = pause_on_next_frame.clone();
            move |_core, video_buffer, mut thread_handle| {
                let mut vbuf = vbuf.lock();
                vbuf.copy_from_slice(video_buffer);
                video::fix_vbuf_alpha(&mut vbuf);
                emu_tps_counter.lock().mark();

                if !replay_is_complete && stepper_state.lock_inner().input_pairs_left() == 0 {
                    completion_token.complete();
                }

                if pause_on_next_frame.swap(false, std::sync::atomic::Ordering::SeqCst)
                    || completion_token.is_complete()
                {
                    thread_handle.pause();
                }
            }
        });

        Ok(Session {
            start_time: std::time::SystemTime::now(),
            game_info: GameInfo { game, patch },
            vbuf,
            _audio_binding: audio_binding,
            thread,
            completion_token,
            pause_on_next_frame,
        })
    }

    pub fn completed(&self) -> bool {
        self.completion_token.is_complete()
    }

    pub fn set_paused(&self, pause: bool) {
        let handle = self.thread.handle();
        if pause {
            handle.pause();
        } else {
            handle.unpause();
        }
    }

    pub fn is_paused(&self) -> bool {
        let handle = self.thread.handle();
        handle.is_paused()
    }

    pub fn frame_step(&self) {
        self.pause_on_next_frame
            .store(true, std::sync::atomic::Ordering::SeqCst);
        let handle = self.thread.handle();
        handle.unpause();
    }

    pub fn set_fps_target(&self, fps: f32) {
        let handle = self.thread.handle();
        let audio_guard = handle.lock_audio();
        audio_guard.sync_mut().set_fps_target(fps);
    }

    pub fn fps_target(&self) -> f32 {
        let handle = self.thread.handle();
        let audio_guard = handle.lock_audio();
        audio_guard.sync().fps_target()
    }

    pub fn set_master_volume(&self, volume: i32) {
        let handle = self.thread.handle();
        let mut audio_guard = handle.lock_audio();
        audio_guard.core_mut().gba_mut().set_master_volume(volume);
    }

    pub fn has_crashed(&self) -> Option<mgba::thread::Handle> {
        let handle = self.thread.handle();
        if handle.has_crashed() {
            Some(handle)
        } else {
            None
        }
    }

    pub fn lock_vbuf(&self) -> parking_lot::MutexGuard<'_, Vec<u8>> {
        self.vbuf.lock()
    }

    pub fn game_info(&self) -> &GameInfo {
        &self.game_info
    }

    pub fn start_time(&self) -> std::time::SystemTime {
        self.start_time
    }
}
