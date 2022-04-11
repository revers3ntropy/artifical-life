use crate::config;

pub mod world;
pub mod entity;
pub mod gameloop;
mod agent;

pub fn create (conf: &Box<config::Config>) -> Box<world::World> {
    let mut w = Box::new(world::World {
        entities: Vec::with_capacity(conf.num_agents as usize)
    });

    world::World::init(&mut w);

    return w;
}