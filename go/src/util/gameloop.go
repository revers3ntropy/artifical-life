package util

import (
	"runtime"
	"time"
)

// GameLoop src: https://github.com/kutase/go-gameloop/blob/master/gameLoop.go
type GameLoop struct {
	OnUpdate func(float64)
	TickRate time.Duration
	Quit     chan bool
}

func (gl *GameLoop) startLoop() {
	runtime.LockOSThread()
	defer runtime.UnlockOSThread()

	tickInterval := time.Second / gl.TickRate
	timeStart := time.Now().UnixNano()

	ticker := time.NewTicker(tickInterval)

	for {
		select {
		case <-ticker.C:
			now := time.Now().UnixNano()
			// DT in seconds
			delta := float64(now-timeStart) / 1000000000
			timeStart = now
			gl.OnUpdate(delta)

		case <-gl.Quit:
			ticker.Stop()
		}
	}
}

func (gl *GameLoop) GetTickRate() time.Duration {
	return gl.TickRate
}

func (gl *GameLoop) SetTickRate(tickRate time.Duration) {
	gl.TickRate = tickRate
	gl.Restart()
}

func (gl *GameLoop) SetOnUpdate(onUpdate func(float64)) {
	gl.OnUpdate = onUpdate
}

// Start game loop
func (gl *GameLoop) Start() {
	go gl.startLoop()
}

// Stop game loop
func (gl *GameLoop) Stop() {
	gl.Quit <- true
}

// Restart game loop
func (gl *GameLoop) Restart() {
	gl.Stop()
	gl.Start()
}
