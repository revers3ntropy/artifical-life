package Sim

import (
	"encoding/json"
	"epq/util"
	"fmt"
	"math"
)

type Config struct {
	NumAgents   int
	SpawnBounds [4]float64
	TickPeriod  int64
}

type World struct {
	Agents []*Agent
	LastID int
	Config *Config
}

func New(config *Config) *World {
	world := &World{
		LastID: 0,
		Agents: []*Agent{},
		Config: config,
	}
	world.InitialiseAgents()
	return world
}

func (w *World) InitialiseAgents() {
	for i := 0; i < w.Config.NumAgents; i++ {

		x := util.RandF64(w.Config.SpawnBounds[0], w.Config.SpawnBounds[2])
		y := util.RandF64(w.Config.SpawnBounds[1], w.Config.SpawnBounds[3])

		w.NewAgent(x, y, util.RandF64(0, math.Pi*2))
	}
}

func (w *World) Update(deltaT float64) {
	for _, a := range w.Agents {
		a.Update(deltaT)
	}
}

func (w *World) NewAgent(x float64, y float64, rot float64) *Agent {
	agent := &Agent{
		Id: w.LastID,
	}
	agent.Initialise(x, y, rot)
	w.Agents = append(w.Agents, agent)
	w.LastID++
	return agent
}

func (w *World) SerializeWorldData() string {
	res, err := json.Marshal(*w)
	if err != nil {
		fmt.Println(err)
	}
	return string(res)
}
