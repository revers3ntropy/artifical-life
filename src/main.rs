mod server;
mod sim;

fn main() {
    
    sim::init();
    
    server::start_server();
}