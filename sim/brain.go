package Sim

import "epq/util"

type BrainIn struct {
	NeuralInputs []float64
}

type BrainOut struct {
	// Move go forward. amount is from -1 to 1 representing how fast to move
	Move func(amount float64)
	// Turn amount from -1 to 1 of for fast to turn
	Turn func(amount float64)
}

type Brain struct {
	NeuralNet *Network
}

func (b *Brain) Initialise(genes [util.GeneLength]float64) {
	b.NeuralNet = &Network{}
	b.NeuralNet.Initialise()

	var inNodes []*Node

	for i := 0; i < 2; i++ {
		inNodes = append(inNodes, b.NeuralNet.AddInputNode(genes[util.GeneLength-1-i]))
	}

	// placeholder functions
	moveNode := b.NeuralNet.AddOutputNode(1, func(v float64) {})
	turnNode := b.NeuralNet.AddOutputNode(1, func(v float64) {})

	b.NeuralNet.Connect(inNodes[0], moveNode, 1)
	b.NeuralNet.Connect(inNodes[1], turnNode, 1)
}

func (b *Brain) Update(in BrainIn, out BrainOut) {

	b.NeuralNet.OutNodes()[0].Output = out.Move
	b.NeuralNet.OutNodes()[1].Output = out.Turn

	for i, n := range b.NeuralNet.Inputs {
		for _, syn := range n.GetEdges(b.NeuralNet.Synapses) {
			syn.Traverse(in.NeuralInputs[i], b.NeuralNet.Synapses)
		}
	}
}
