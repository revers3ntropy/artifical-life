use serde::Serializer;

pub trait Entity {
    fn init (&self);
    fn update (&self, delta_t: u64);

    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer;
}