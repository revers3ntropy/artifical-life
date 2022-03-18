package Sim

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

func (b *Brain) Initialise(genes []float64) {

}

func (b *Brain) Update(in BrainIn, out BrainOut) {

	for i, n := range b.NeuralNet.Inputs {
		for _, syn := range n.GetEdges(b.NeuralNet.Synapses) {
			syn.Traverse(in.NeuralInputs[i], b.NeuralNet.Synapses)
		}
	}
}
