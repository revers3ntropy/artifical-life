package Sim

import (
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

func (a *Agent) Update() {

}

func (a *Agent) Move(amount float64) {
	by := vector2.New(
		math.Sin(a.Rot),
		math.Cos(a.Rot),
	)

	// limit magnitude
	by.Normalize()
	by.MulScalar(math.Min(amount, 1))

	a.Pos.Add(by)
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
