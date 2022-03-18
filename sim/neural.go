package Sim

import "encoding/json"

type Node struct {
	weight  float64
	IsInput bool
	Output  func(signal float64)
}

func (n *Node) MarshalJSON() ([]byte, error) {
	return json.Marshal(struct {
		Weight   float64
		IsInput  bool
		IsOutput bool
	}{
		Weight:   n.weight,
		IsInput:  n.IsInput,
		IsOutput: n.Output != nil,
	})
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

func (n *Network) Initialise() {
	n.Inputs = []*Node{}
	n.Nodes = []*Node{}
	n.Synapses = []*Edge{}
}

func (n *Network) OutNodes() []*Node {
	var out []*Node

	for _, n := range n.Nodes {
		if n.Output != nil {
			out = append(out, n)
		}
	}

	return out
}

func (n *Network) AddInputNode(weight float64) *Node {
	node := &Node{
		weight:  weight,
		IsInput: true,
	}
	n.Inputs = append(n.Inputs, node)
	n.Nodes = append(n.Nodes, node)
	return node
}

func (n *Network) AddOutputNode(weight float64, out func(float64)) *Node {
	node := &Node{
		weight: weight,
		Output: out,
	}
	n.Nodes = append(n.Nodes, node)
	return node
}

func (n *Network) Connect(n1 *Node, n2 *Node, bias float64) *Edge {
	edge := &Edge{
		n1:   n1,
		n2:   n2,
		bias: bias,
	}
	n.Synapses = append(n.Synapses, edge)
	return edge
}
