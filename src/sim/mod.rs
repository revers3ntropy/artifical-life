pub mod world;
pub mod entity;
pub mod gameloop;

pub fn create () -> Box<world::World> {
    let w = Box::new(world::World {
        entities: vec![]
    });

    world::World::init(&w);

    return w;
}