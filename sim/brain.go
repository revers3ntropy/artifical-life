package Sim

import (
	"encoding/json"
	"epq/util"
	"github.com/cpmech/gosl/la"
	"math"
)

type NeuralInputs [util.NumOfNeuralInputs]float64

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

func (b *Brain) Initialise(genes [util.GeneLength]float64) {
	b.NeuralNet = &Network{}

	// +2 for in/out layers
	//layers := int(math.Min(math.Abs(math.Round(genes[11]/genes[12])), util.MaxLayers)) + 2
	layers := 2
	b.NeuralNet.Initialise(layers)

	// Initialise the layers
	prevLayerNodes := util.NumOfNeuralInputs

	b.NeuralNet.Layers[0] = &Layer{
		// input layer
		numNodes: util.NumOfNeuralInputs,
		Weights:  util.RandMat(util.NumOfNeuralInputs, util.NumOfNeuralInputs),
		Biases:   util.RangedRandVec(util.NumOfNeuralInputs, -1, 1),
	}

	// hidden layers
	for i := 1; i < layers-1; i += 1 {
		// turn num from 0-1 into number from 3-81
		nodes := int(math.Min(math.Round(math.Pow(3, math.Pow(genes[13+i]+1, genes[13+i]+1))), util.MaxNodes))

		w := util.RandMat(nodes, prevLayerNodes)

		b.NeuralNet.Layers[i] = &Layer{
			numNodes: nodes,
			Weights:  w,
			Biases:   util.RangedRandVec(nodes, -1, 1),
		}

		prevLayerNodes = nodes
	}

	// output layer
	b.NeuralNet.Layers[layers-1] = &Layer{
		numNodes: util.NumOfNeuralOutputs,
		Weights:  util.RandMat(util.NumOfNeuralOutputs, prevLayerNodes),
		Biases:   util.RangedRandVec(util.NumOfNeuralOutputs, -1, 1),
	}
}

func (b *Brain) ExecuteBrainOutput(dt float64, e *Entity, output la.Vector) {
	e.Move(output[0] * dt * 20)
	e.Turn((output[1]*dt - 0.5) * 0.05)
}

func (b *Brain) Update(dt float64, e *Entity) {
	input := util.RandVec(util.NumOfNeuralInputs)
	output := b.NeuralNet.Run(input)
	b.ExecuteBrainOutput(dt, e, output)
}
