mod server;
mod sim;
mod config;

fn main() {
    let config = config::load_config();

    let world = sim::create(&config);

    let _ = sim::gameloop::run_game_loop(&world, &config);

    server::start_server(&world);
}