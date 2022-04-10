package Sim

import (
	util2 "epq/src/util"
	"fmt"
)

func StartGameLoop(w *World) {

	gl := util2.GameLoop{
		OnUpdate: func(delta float64) {
			w.Update(delta)
		},
		TickRate: util2.TickRate,
		Quit:     make(chan bool),
	}
	fmt.Println("Starting game loop...")
	gl.Start()
}
