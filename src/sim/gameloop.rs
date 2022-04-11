use std::time::Duration;
use crate::sim::world::World;
use std::thread::sleep;
use crate::config;

pub async fn run_game_loop(w: &Box<World>, conf: &Box<config::Config>) -> Result<(), String> {

    let frame_delay = Duration::new(0, 1_000_000_000u32 / conf.fps);

    let mut last_time = std::time::Instant::now();

    loop {
        let now = std::time::Instant::now();
        let delta_time = now - last_time;
        last_time = now;

        w.update(delta_time.as_secs());

        sleep(frame_delay);
    }
}