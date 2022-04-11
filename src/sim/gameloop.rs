use std::time::Duration;
use crate::sim::world::World;

pub async fn run_game_loop(w: &Box<World>, fps: u32) -> Result<(), String> {

    let mut i = 0;
    loop {
        // Update
        i = (i + 1) % 255;

        // Time management!
        ::std::thread::sleep(Duration::new(0, 1_000_000_000u32 / fps));
    }
}