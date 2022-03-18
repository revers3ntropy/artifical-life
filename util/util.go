package util

import (
	"math/rand"
	"time"
)

func SeedRand() {
	rand.Seed(time.Now().UnixNano())
}

func RandF64(min float64, max float64) float64 {
	return min + rand.Float64()*(max-min)
}

func WeightedProduct(values []float64, weights []float64) float64 {
	res := 0.0
	if len(values) != len(weights) {
		panic("Invalid number of values and weights for weighted average")
	}
	sumWeights := 0.0

	for i := range values {
		sumWeights += weights[i]
		res += values[i] * weights[i]
	}
	if sumWeights > 1.01 || sumWeights < 0.99 {
		panic("Sum of the weights or weighted average outside bounds [0.99, 1.01]")
	}

	return res / float64(len(values))
}
