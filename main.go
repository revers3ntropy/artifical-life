package main

import (
	"epq/server"
	"epq/sim"
)

func main() {
	Server.StartServer()
	Sim.InitialiseSim()
}
