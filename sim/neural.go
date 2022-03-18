package Sim

type Node struct {
	weight  float64
	IsInput bool
	Output  func(signal float64)
}

func (n *Node) GetEdges(synapses []*Edge) []*Edge {
	var out []*Edge

	for _, s := range synapses {
		if s.n1 == n {
			out = append(out, s)
		}
	}

	return out
}

type Edge struct {
	n1   *Node
	n2   *Node
	bias float64
}

// Traverse an edge.
// Searches for all edges which link to the n2 of the current edge,
// and if one is found which links through current n2, recurse to it.
// Deals with the bias of the edge and the weight of n1
///**
func (e *Edge) Traverse(signal float64, synapses []*Edge) {

	signal *= e.n1.weight
	signal *= e.bias

	// if n2 is an output node, then there won't be any nodes which link to it.
	// Instead, run the output function, taking into account the weight of the final node.
	if e.n2.Output != nil {
		e.n2.Output(signal * e.n2.weight)
		return
	}

	for _, s := range e.n1.GetEdges(synapses) {
		s.Traverse(signal, synapses)
	}
}

type Network struct {
	Inputs []*Node
	// includes inputs and outputs
	Nodes    []*Node
	Synapses []*Edge
}
