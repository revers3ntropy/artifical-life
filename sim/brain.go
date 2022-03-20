package Sim

import (
	"encoding/json"
	"epq/util"
	"fmt"
	"github.com/cpmech/gosl/la"
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

	// input layer
	b.NeuralNet.Layers[0] = &Layer{
		numNodes: util.NumOfNeuralInputs,
		Weights:  util.RandMat(util.NumOfNeuralInputs, util.NumOfNeuralInputs),
		Biases:   util.RangedRandVec(util.NumOfNeuralInputs, 0, 0),
	}

	// hidden layers
	for i := 1; i < layers-1; i += 1 {
		// turn num from 0-1 into number from 3-81
		//nodes := int(math.Min(math.Round(math.Pow(3, math.Pow(genes[13+i]+1, genes[13+i]+1))), util.MaxNodes))
		nodes := 2
		w := util.RandMat(nodes, prevLayerNodes)

		b.NeuralNet.Layers[i] = &Layer{
			numNodes: nodes,
			Weights:  w,
			Biases:   util.RangedRandVec(nodes, 0, 0),
		}

		prevLayerNodes = nodes
	}

	// output layer
	b.NeuralNet.Layers[layers-1] = &Layer{
		numNodes: util.NumOfNeuralOutputs,
		Weights:  util.RandMat(util.NumOfNeuralOutputs, prevLayerNodes),
		Biases:   util.RangedRandVec(util.NumOfNeuralOutputs, 0, 0),
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
	input := util.RandVec(util.NumOfNeuralInputs)
	//input := []float64{0, 0, 0, 0, 0}
	output := b.NeuralNet.Run(input)
	b.ExecuteBrainOutput(dt, e, output)

	fmt.Println("Final output: ", output)

	outs = append(outs, output)

	means := [util.NumOfNeuralOutputs]float64{}
	for i := 0; i < len(outs); i++ {
		for j := 0; j < len(outs[i]); j++ {
			means[j] += outs[i][j]
		}
	}

	for j := 0; j < len(means); j++ {
		fmt.Println("mean", j, ":", means[j]/float64(len(outs)))
	}

}
