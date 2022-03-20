package Sim

import (
	"encoding/json"
	"epq/util"
	"fmt"
	"math"
)

type World struct {
	Entities []*Entity
	LastID   int
}

func New() *World {
	world := &World{
		LastID:   0,
		Entities: []*Entity{},
	}
	world.InitialiseAgents()
	return world
}

func (w *World) InitialiseAgents() {
	// Generates some agents
	// random position and random rotation
	for i := 0; i < util.NumAgents; i++ {

		x := util.RandF64(util.SpawnBounds[0], util.SpawnBounds[2])
		y := util.RandF64(util.SpawnBounds[1], util.SpawnBounds[3])

		w.NewAgent(x, y, util.RandF64(0, math.Pi*2))
	}
}

// SerializeWorldData - JSONify the world data
func (w *World) SerializeWorldData() string {
	res, err := json.Marshal(*w)
	if err != nil {
		fmt.Println(err)
	}
	return string(res)
}

func (w *World) Update(deltaT float64) {
	for _, a := range w.Entities {
		a.Update(deltaT)
	}
}

func (w *World) NewAgent(x float64, y float64, rot float64) *Entity {
	agent := &Entity{
		Id:     w.LastID,
		Weight: util.StartWeight,
		Energy: util.StartEnergy,
	}
	agent.Initialise(Agent, x, y)
	agent.Rot = rot
	agent.NormaliseDirection()
	w.Entities = append(w.Entities, agent)
	w.LastID++
	return agent
}
