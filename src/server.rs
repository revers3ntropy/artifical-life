use warp::{Filter, serve};
use crate::sim::world::World;

#[tokio::main]
pub async fn start_server(world: &Box<World>) {
    println!("Starting server...");

    let hello = warp::path!("data")
        .map(|| {
            serde::Serialize::serialize(world)
                .expect("Couldn't serialize world data")
        });

    warp::serve(hello)
        .run(([127, 0, 0, 1], 3030))
        .await;
}