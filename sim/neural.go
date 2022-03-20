package Sim

import (
	"fmt"
	"github.com/cpmech/gosl/la"
	"math"
)

func ActivationFunc(n float64) float64 {
	return math.Abs(math.Tanh(n))
}

type Layer struct {
	numNodes int
	Weights  *la.Matrix
	Biases   la.Vector
}

func (l *Layer) Activate(inp la.Vector) la.Vector {
	out := la.NewVector(l.numNodes)
	la.MatVecMul(out, 1, l.Weights, inp)

	for x := 0; x < l.numNodes; x++ {
		out[x] = ActivationFunc(out[x] + l.Biases[x])
	}

	return out
}

type Network struct {
	Layers []*Layer
}

func (n *Network) Initialise(layers int) {
	n.Layers = []*Layer{}
	for i := 0; i < layers; i++ {
		n.Layers = append(n.Layers, nil)
	}
}

func (n *Network) Run(input la.Vector) la.Vector {
	current := input
	for _, l := range n.Layers {
		current = l.Activate(current)
	}
	fmt.Println(current)
	return current
}
