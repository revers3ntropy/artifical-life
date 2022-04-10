package Sim

import (
	"encoding/json"
	util2 "epq/src/util"
	"fmt"
	"github.com/cpmech/gosl/la"
	"math"
)

type NeuralInputs [util2.NumOfNeuralInputs]float64

type Brain struct {
	NeuralNet *Network
}

func (b *Brain) MarshalJSON() ([]byte, error) {
	var layers []int

	for _, l := range b.NeuralNet.Layers {
		layers = append(layers, l.numNodes)
	}

	return json.Marshal(layers)
}

func (b *Brain) Initialise(genes [util2.GeneLength]float64) {
	b.NeuralNet = &Network{}

	// +2 for in/out layers
	layers := int(math.Min(math.Abs(math.Round(genes[11]/genes[12])), util.MaxLayers)) + 2
	b.NeuralNet.Initialise(layers)

	// Initialise the layers
	prevLayerNodes := util2.NumOfNeuralInputs

	// input layer
	b.NeuralNet.Layers[0] = &Layer{
		numNodes: util2.NumOfNeuralInputs,
		Weights:  util2.RandMat(util2.NumOfNeuralInputs, util2.NumOfNeuralInputs),
		Biases:   util2.RangedRandVec(util2.NumOfNeuralInputs, 0, 0),
	}

	// hidden layers
	for i := 1; i < layers-1; i += 1 {
		// turn num from 0-1 into number from 3-81
		//nodes := int(math.Min(math.Round(math.Pow(3, math.Pow(genes[13+i]+1, genes[13+i]+1))), util.MaxNodes))
		nodes := 2
		w := util2.RandMat(nodes, prevLayerNodes)

		b.NeuralNet.Layers[i] = &Layer{
			numNodes: nodes,
			Weights:  w,
			Biases:   util2.RangedRandVec(nodes, 0, 0),
		}

		prevLayerNodes = nodes
	}

	// output layer
	b.NeuralNet.Layers[layers-1] = &Layer{
		numNodes: util2.NumOfNeuralOutputs,
		Weights:  util2.RandMat(util2.NumOfNeuralOutputs, prevLayerNodes),
		Biases:   util2.RangedRandVec(util2.NumOfNeuralOutputs, 0, 0),
	}
}

func (b *Brain) ExecuteBrainOutput(dt float64, e *Entity, output la.Vector) {
	e.Move(output[0] * dt * 20)
	e.Turn((output[1]*dt - 0.5) * 0.05)
}

var outs []la.Vector

func (b *Brain) Update(dt float64, e *Entity) {
	if outs == nil {
		outs = []la.Vector{}
	}
	input := util2.RandVec(util2.NumOfNeuralInputs)
	//input := []float64{0, 0, 0, 0, 0}
	output := b.NeuralNet.Run(input)
	b.ExecuteBrainOutput(dt, e, output)

	fmt.Println("Final output: ", output)

	outs = append(outs, output)

	means := [util2.NumOfNeuralOutputs]float64{}
	for i := 0; i < len(outs); i++ {
		for j := 0; j < len(outs[i]); j++ {
			means[j] += outs[i][j]
		}
	}

	for j := 0; j < len(means); j++ {
		fmt.Println("mean", j, ":", means[j]/float64(len(outs)))
	}

}
