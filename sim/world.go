package Sim

import (
	"encoding/json"
	"epq/util"
	"fmt"
	"math"
)

type World struct {
	Agents []Agent
	LastID int
}

func New() *World {
	world := &World{
		LastID: 0,
		Agents: []Agent{},
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
	for _, a := range w.Agents {
		a.Update()
	}
}

func (w *World) NewAgent(x float64, y float64, rot float64) *Agent {
	agent := Agent{
		Id: w.LastID,
	}
	agent.Initialise(x, y, rot)
	w.Agents = append(w.Agents, agent)
	w.LastID++
	return &agent
}

func (w *World) SerializeWorldData() string {
	res, err := json.Marshal(*w)
	if err != nil {
		fmt.Println(err)
	}
	return string(res)
}
