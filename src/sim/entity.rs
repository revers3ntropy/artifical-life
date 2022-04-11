pub trait Entity {
    fn init (&self);
    fn update (&self);
    fn json (&self) -> str;
}