mod server;
mod sim;

fn main() {
    let world = sim::create();
    let _ = sim::gameloop::run_game_loop(&world, 30);
    server::start_server(&world);
}