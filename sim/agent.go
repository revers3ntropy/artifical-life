package Sim

import (
	"github.com/deeean/go-vector/vector2"
	"math"
)

type Agent struct {
	id        int
	position  *vector2.Vector2
	direction float64
}

func (a *Agent) Initialise(x float64, y float64, rot float64) {
	a.position = vector2.New(x, y)
	a.direction = rot
	a.NormaliseDirection()

}

func (a *Agent) Update() {

}

func (a *Agent) Move(amount float64) {
	by := vector2.New(
		math.Sin(a.direction),
		math.Cos(a.direction),
	)

	// limit magnitude
	by.Normalize()
	by.MulScalar(math.Min(amount, 1))

	a.position.Add(by)
}

func (a *Agent) NormaliseDirection() {
	for a.direction < 0 {
		a.direction += math.Pi * 2
	}

	a.direction = math.Mod(a.direction, math.Pi*2)
}

func (a *Agent) Turn(amount float64) {
	a.direction += amount
	a.NormaliseDirection()
}
