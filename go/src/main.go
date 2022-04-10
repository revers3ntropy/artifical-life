package main

import (
	"epq/src/server"
	"epq/src/sim"
	util2 "epq/src/util"
)

func main() {
	util2.SeedRand()
	World := Sim.New()
	Sim.Sim.StartGameLoop(World)
	Server.Server.StartServer(World, util2.Port)
}
