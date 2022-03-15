package main

import (
	"epq/server"
	"epq/sim"
	"epq/util"
	"fmt"
	"os"
)

func loadConfigFromFile() {
	if len(os.Args) <= 1 {
		return
	}

	path := os.Args[1]
	file, err := os.ReadFile(path)
	if err != nil {
		fmt.Print("Cannot parse config file\n")
		fmt.Print(err)
		fmt.Print("\n")
		return
	}
	util.LoadConfig(file)
	fmt.Println("Loaded config from '" + path + "'")
}

func main() {
	util.SeedRand()
	loadConfigFromFile()
	world := Sim.New()
	Server.StartServer(world)
}
