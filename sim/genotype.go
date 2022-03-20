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

		10: start of num of hidden layers for brain
		11: num of   ^
		12: step for ^

		100-n to 100: Input weights
	*/
	genes [util.GeneLength]float64
}

func (g *Genotype) Initialise() {
	g.genes = [util.GeneLength]float64{}
	for i := range g.genes {
		g.genes[i] = util.RandF64(0, 1)
	}
}

func (g *Genotype) Update() {
	g.genes = [util.GeneLength]float64{}
	for i := range g.genes {
		g.genes[i] = util.RandF64(0, 1)
	}
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
	weight := []float64{0.4, 0.6}
	red := 255 * util.WeightedProduct([]float64{g.genes[0], g.genes[1]}, weight)
	green := 255 * util.WeightedProduct([]float64{g.genes[0], g.genes[2]}, weight)
	blue := 255 * util.WeightedProduct([]float64{g.genes[0], g.genes[3]}, weight)

	return "rgb(" +
		fmt.Sprintf("%f", red) + ", " +
		fmt.Sprintf("%f", green) + ", " +
		fmt.Sprintf("%f", blue) +
		")"
}

func (g *Genotype) MoveEfficiency() float64 {
	return g.genes[4]
}

func (g *Genotype) GrowthRate() float64 {
	x := g.genes[5]
	return (math.Pow(2, math.Pow(x+0.01, x+20))) - 1
}

func (g *Genotype) RestingEfficiency() float64 {
	return util.WeightedProduct([]float64{g.genes[6], g.genes[4]}, []float64{0.8, 0.2})
}
