use crate::sim::entity::Entity;
use crate::sim::agent::{ Agent };

pub struct World {
    pub entities: Vec<Box<dyn Entity>>
}

impl World {
    pub fn init (&mut self) {

        for _ in 0..1 {
            self.entities.push(Box::new(Agent {
                x: 0.0,
                y: 0.0
            }));
        }

        // initialises entities
        let _ = self.entities
            .iter()
            .map(|e| Entity::init(e.as_ref()));
    }

    pub fn update (&self, d_t: u64) {
        let _ = self.entities
            .iter()
            .map(|e| Entity::update(e.as_ref(), d_t));
    }
}