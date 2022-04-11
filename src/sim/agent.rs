use crate::sim::entity::Entity;
use serde;


#[derive(serde::Deserialize)]
pub struct Agent {
    #[serde()]
    pub(crate) x: f64,
    #[serde()]
    pub(crate) y: f64,
}


impl Entity for Agent {
    fn init (&self) {

    }

    fn update (&self, d_t: u64) {

    }
}