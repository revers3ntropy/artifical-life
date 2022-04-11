mod server;
mod sim;

fn main() {
    let world = sim::create();
    sim::gameloop::run_game_loop(&world, 60);
    server::start_server(&world);
}