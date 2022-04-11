pub trait Component {
    fn init (&self, &e: Entity);
    fn update (&self, &e: Entity);
}