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

	if util.RandF64(0, 1) > 0.95 {
		w.SpawnRandFood()
	}
}

func (w *World) SpawnRandFood() {
	e := util.RandF64(2, 5)
	w.Entities = append(w.Entities, &Entity{
		Type:   Food,
		Id:     w.LastID,
		Pos:    util.RangedRandVec2(-100, 100),
		Rot:    0,
		Alive:  false,
		Energy: e,
		Weight: e,
		Genes:  nil,
		Brain:  nil,
	})
	w.LastID++
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
