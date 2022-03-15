package Sim

import (
	"epq/util"
	"github.com/deeean/go-vector/vector2"
	"math"
)

type Agent struct {
	Id  int
	Pos *vector2.Vector2
	Rot float64
}

func (a *Agent) Initialise(x float64, y float64, rot float64) {
	a.Pos = vector2.New(x, y)
	a.Rot = rot
	a.NormaliseDirection()

}

func (a *Agent) Update(deltaT float64) {
	a.Turn(util.RandF64(-0.5, 0.5) * deltaT)
	a.Move(util.RandF64(0.5, 1) * deltaT)
}

func (a *Agent) Move(amount float64) {
	by := vector2.New(
		math.Sin(a.Rot),
		math.Cos(a.Rot),
	)

	// limit magnitude
	by = by.Normalize()
	by = by.MulScalar(amount)

	a.Pos = a.Pos.Add(by)
}

func (a *Agent) NormaliseDirection() {
	for a.Rot < 0 {
		a.Rot += math.Pi * 2
	}

	a.Rot = math.Mod(a.Rot, math.Pi*2)
}

func (a *Agent) Turn(amount float64) {
	a.Rot += amount
	a.NormaliseDirection()
}
