use serde;
use std::fs;

#[derive(serde::Serialize, serde::Deserialize)]
pub struct Config {
    pub num_agents: u32,
    pub fps: u32,
}

pub fn load_config () -> Box<Config> {
    let data = fs::read_to_string("/etc/hosts")
        .expect("Unable to read config file");
    Box::new(serde_json::from_str(&data).unwrap())
}