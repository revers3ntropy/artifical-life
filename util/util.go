package util

import (
	"github.com/cpmech/gosl/la"
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

func RandMat(m int, n int) *la.Matrix {
	w := la.NewMatrix(m, n)
	for x := 0; x < m; x++ {
		for y := 0; y < n; y++ {
			w.Set(x, y, RandF64(0, 1))
		}
	}
	return w
}

func RandVec(n int) la.Vector {
	w := la.NewVector(n)
	for i := 0; i < n; i++ {
		w[i] = RandF64(0, 1)
	}
	return w
}

func RangedRandMat(m int, n int, min float64, max float64) *la.Matrix {
	w := la.NewMatrix(m, n)
	for x := 0; x < m; x++ {
		for y := 0; y < n; y++ {
			w.Set(x, y, RandF64(min, max))
		}
	}
	return w
}

func RangedRandVec(n int, min float64, max float64) la.Vector {
	w := la.NewVector(n)
	for i := 0; i < n; i++ {
		w[i] = RandF64(min, max)
	}
	return w
}
