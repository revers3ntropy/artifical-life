package main

import (
	"epq/src/server"
	"epq/src/sim"
	util2 "epq/src/util"
)

func main() {
	util2.SeedRand()
	world := Sim.New()
	Sim.Sim.StartGameLoop(world)
	Server.Server.StartServer(world, util2.Port)
}
