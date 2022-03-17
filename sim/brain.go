package Sim

import "epq/util"

type BrainIn struct {
}

type BrainOut struct {
	// Move go forward. amount is from -1 to 1 representing how fast to move
	Move func(amount float64)
	// Turn amount from -1 to 1 of for fast to turn
	Turn func(amount float64)
}

func TickBrain(in BrainIn, out BrainOut) {
	out.Turn(util.RandF64(-1, 1))
	out.Move(util.RandF64(0.5, 1))
}
