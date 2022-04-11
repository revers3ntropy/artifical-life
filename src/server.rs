use warp::Filter;
use crate::sim::world::World;

#[tokio::main]
pub async fn start_server(world: &Box<World>) {
    println!("Starting server...");

    let hello = warp::path!("hi")
        .map(|| format!("Hello!"));

    warp::serve(hello)
        .run(([127, 0, 0, 1], 3030))
        .await;
}