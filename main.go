package main

import (
	"epq/server"
	"epq/sim"
	"epq/util"
)

func main() {
	util.SeedRand()
	world := Sim.New()
	Sim.StartGameLoop(world)
	Server.StartServer(world, util.Port)
}
