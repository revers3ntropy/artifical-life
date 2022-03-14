package Sim

import "sync"

type World struct {
	agents []Agent
	lastID int
}

var instantiated *World
var once sync.Once

func New() *World {
	once.Do(func() {
		instantiated = &World{
			lastID: 0,
			agents: []Agent{},
		}
	})
	return instantiated
}

func (w *World) Update() {
	for _, a := range w.agents {
		a.Update()
	}
}

func (w *World) NewAgent() *Agent {
	agent := Agent{id: w.lastID}
	agent.Initialise()
	w.agents = append(w.agents, agent)
	return &agent
}
