package Sim

import (
	"github.com/deeean/go-vector/vector2"
	"math"
)

type EntityType int

const (
	Agent EntityType = iota
	Food
)

type Entity struct {
	Type   EntityType
	Id     int
	Pos    *vector2.Vector2
	Rot    float64
	Alive  bool
	Energy float64
	Weight float64

	Genes *Genotype
	Brain *Brain
}

func (a *Entity) Initialise(t EntityType, x float64, y float64) {
	a.Pos = vector2.New(x, y)

	switch t {
	case Agent:
		a.Genes = &Genotype{}
		a.Genes.Initialise()

		a.Brain = &Brain{}
		a.Brain.Initialise(a.Genes.genes)
	}
}

func (a *Entity) Update(deltaT float64) {
	a.Brain.Update(deltaT, a)

	if a.Genes != nil {
		a.Energy -= a.Genes.RestingEfficiency()
		a.Weight += a.Genes.GrowthRate()
	}
}

func (a *Entity) Move(amount float64) {
	by := vector2.New(
		math.Sin(a.Rot),
		math.Cos(a.Rot),
	)

	// limit magnitude
	by = by.Normalize()
	by = by.MulScalar(amount)

	a.Energy -= amount * a.Genes.MoveEfficiency()

	a.Pos = a.Pos.Add(by)
}

func (a *Entity) NormaliseDirection() {
	for a.Rot < 0 {
		a.Rot += math.Pi * 2
	}

	a.Rot = math.Mod(a.Rot, math.Pi*2)
}

func (a *Entity) Turn(amount float64) {
	a.Rot += amount
	a.NormaliseDirection()
}
