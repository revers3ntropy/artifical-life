package Sim

import (
	"encoding/json"
	"epq/util"
	"fmt"
	"math"
)

type World struct {
	agents []Agent
	lastID int
}

func New() *World {
	world := &World{
		lastID: 0,
		agents: []Agent{},
	}
	world.InitialiseAgents()
	return world
}

func (w *World) InitialiseAgents() {
	for i := 0; i < util.Config.NumAgents; i++ {

		x := util.RandF64(util.Config.SpawnBounds[0], util.Config.SpawnBounds[2])
		y := util.RandF64(util.Config.SpawnBounds[1], util.Config.SpawnBounds[3])

		w.NewAgent(x, y, util.RandF64(0, math.Pi*2))
	}
}

func (w *World) Update() {
	for _, a := range w.agents {
		a.Update()
	}
}

func (w *World) NewAgent(x float64, y float64, rot float64) *Agent {
	agent := Agent{
		id: w.lastID,
	}
	agent.Initialise(x, y, rot)
	w.agents = append(w.agents, agent)
	w.lastID++
	return &agent
}

func (w *World) SerializeWorldData() string {
	res, err := json.Marshal(w)
	if err != nil {
		fmt.Print(err)
	}
	return string(res)
}
