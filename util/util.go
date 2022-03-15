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
