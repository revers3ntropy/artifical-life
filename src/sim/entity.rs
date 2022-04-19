use serde::Serialize;

pub trait Entity : Serialize {
    fn init (&self);
    fn update (&self, delta_t: u64);
}