package Sim

import "github.com/deeean/go-vector/vector2"

// Entity is the base class for everything which appears in the simulation
type Entity struct {
	Pos    *vector2.Vector2
	Update func(deltaT float64, config *Config)
}
