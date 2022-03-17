package Sim

import (
	"encoding/json"
	"epq/util"
	"fmt"
	"math"
)

type Genotype struct {
	/*
		Array of floats from 0 to 1. Used to get phenotype

		0: brightness
		1: redness
		2: greenness
		3: blueness
		4: movement efficiency
		5: growth rate
	*/
	genes [util.GeneLength]float64
}

func (g *Genotype) MarshalJSON() ([]byte, error) {
	return json.Marshal(struct {
		Colour string
	}{
		Colour: g.Colour(),
	})
}

func (g *Genotype) Clone() *Genotype {
	return &Genotype{
		genes: g.genes,
	}
}

func (g *Genotype) GetMutated(mutationRate float64) *Genotype {
	genes := [util.GeneLength]float64{}
	for i := range genes {
		genes[i] += mutationRate * util.RandF64(-1, 1)
		// limit to 0, 1
		genes[i] = math.Min(math.Max(genes[i], 0), 1)
	}
	return &Genotype{genes}
}

func (g *Genotype) Colour() string {
	red := fmt.Sprintf("%f", 255*g.genes[0]*g.genes[1])
	green := fmt.Sprintf("%f", 255*g.genes[0]*g.genes[2])
	blue := fmt.Sprintf("%f", 255*g.genes[0]*g.genes[3])
	return "rgb(" + red + ", " + green + ", " + blue + ")"
}

func (g *Genotype) MoveEfficiency() float64 {
	return g.genes[4]
}

func (g *Genotype) GrowthRate() float64 {
	x := g.genes[5]
	return (math.Pow(2, math.Pow(x+0.01, x+20))) - 1
}

func (g *Genotype) RestingEfficiency() float64 {
	return g.genes[5]
}
