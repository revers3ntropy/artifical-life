use crate::sim::entity::Entity;
use serde;
use serde::ser::SerializeStruct;
use serde::Serializer;


pub struct Agent {
    pub x: f64,
    pub y: f64,
}


impl Entity for Agent {
    fn init (&self) {

    }

    fn update (&self, d_t: u64) {

    }

    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        let mut s = serializer.serialize_struct("Entity", 2)?;
        s.serialize_field("x", &self.x)?;
        s.serialize_field("y", &self.y)?;
        s.end()
    }
}