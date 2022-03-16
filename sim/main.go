package Sim

import (
	"epq/util"
	"fmt"
)

func StartGameLoop(w *World) {

	gl := util.GameLoop{
		OnUpdate: func(delta float64) {
			w.Update(delta)
		},
		TickRate: w.Config.TickRate,
		Quit:     make(chan bool),
	}
	fmt.Println("Starting game loop...")
	gl.Start()
}
