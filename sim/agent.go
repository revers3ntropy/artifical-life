package Sim

import (
	"github.com/deeean/go-vector/vector2"
	"math"
)

type Agent struct {
	Id     int
	Pos    *vector2.Vector2
	Rot    float64
	energy float64
	weight float64
	genes  *Genotype
	brain  *Brain
}

func (a *Agent) Initialise(x float64, y float64, rot float64) {
	a.Pos = vector2.New(x, y)
	a.Rot = rot
	a.NormaliseDirection()

	a.genes = &Genotype{
		genes: [100]float64{},
	}
}

func (a *Agent) Update(deltaT float64, config *Config) {
	a.brain.Update(BrainIn{}, BrainOut{
		Move: func(amount float64) {
			a.Move(config.MoveSpeed * amount * deltaT)
		},
		Turn: func(amount float64) {
			a.Turn(config.TurnSpeed * amount * deltaT)
		},
	})
}

func (a *Agent) Move(amount float64) {
	by := vector2.New(
		math.Sin(a.Rot),
		math.Cos(a.Rot),
	)

	// limit magnitude
	by = by.Normalize()
	by = by.MulScalar(amount)

	a.energy -= amount * a.genes.MoveEfficiency()

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
