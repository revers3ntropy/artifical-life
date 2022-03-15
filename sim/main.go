package Sim

import (
	"epq/util"
	"fmt"
	"time"
)

func StartGameLoop(w *World) {
	if w.Config.TickPeriod <= 0 {
		panic("TickPeriod in config lte 0")
	}

	gl := util.GameLoop{
		OnUpdate: func(delta float64) {
			w.Update(delta)
		},
		TickRate: time.Duration(w.Config.TickPeriod) * time.Millisecond,
		Quit:     make(chan bool),
	}
	fmt.Println("Starting game loop...")
	gl.Start()
}
