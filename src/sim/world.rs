use crate::sim::entity::Entity;
use crate::sim::agent::{ Agent };
use serde::{Serialize, Serializer};
use serde::ser::SerializeStruct;

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


impl Serialize for World {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        let mut s = serializer.serialize_struct("World", 1)?;
        s.serialize_field("entities",
                          &self.entities
                              .iter()
                              .map(|a| {
                                  a.serialize()
                                      .expect("Failed to serialize entity");
                              }))?;
        s.end()
    }
}