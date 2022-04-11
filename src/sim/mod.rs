pub mod world;
pub mod entity;
pub mod gameloop;
mod agent;

pub fn create () -> Box<world::World> {
    let mut w = Box::new(world::World {
        entities: vec![]
    });

    world::World::init(&mut w);

    return w;
}