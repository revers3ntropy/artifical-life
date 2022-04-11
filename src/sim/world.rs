use crate::sim::entity::Entity;

pub struct World {
    pub entities: Vec<Box<dyn Entity>>
}

impl World {
    pub fn init (&self) {
        // initialises entities
        let _ = self.entities
            .iter()
            .map(|e| Entity::init(e.as_ref()));
    }

    pub fn update (&self) {
        let _ = self.entities
            .iter()
            .map(|e| Entity::update(e.as_ref()));
    }
}