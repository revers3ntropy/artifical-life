package main

import (
	"epq/server"
	"epq/sim"
	"epq/util"
	"fmt"
	"os"
)

func loadConfigFromFile() {
	if len(os.Args) > 1 {
		file, err := os.ReadFile(os.Args[1])
		if err != nil {
			fmt.Print("Cannot parse config file\n")
			fmt.Print(err)
			fmt.Print("\n")
			return
		}
		util.LoadConfig(file)
	}
}

func main() {
	util.SeedRand()
	loadConfigFromFile()
	world := Sim.New()
	Server.StartServer(world)
}
