pub trait Entity {
    fn init (&self);
    fn update (&self, delta_t: u64);
}