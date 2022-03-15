package main

import (
	"encoding/json"
	"epq/server"
	"epq/sim"
	"epq/util"
	"fmt"
	"os"
)

func loadConfigFromFile() *Sim.Config {
	if len(os.Args) <= 1 {
		return &Sim.Config{}
	}

	// read file
	path := os.Args[1]
	file, err := os.ReadFile(path)
	if err != nil {
		fmt.Println("Cannot read config file")
		fmt.Println(err)
		return &Sim.Config{}
	}

	// parse JSON
	var configJSON Sim.Config
	err = json.Unmarshal(file, &configJSON)
	if err != nil {
		fmt.Println("Cannot parse config file")
		fmt.Println(err)
		return &Sim.Config{}
	}

	fmt.Println("Loaded config from '" + path + "'")
	return &configJSON
}

func main() {
	util.SeedRand()
	world := Sim.New(loadConfigFromFile())
	Sim.StartGameLoop(world)
	Server.StartServer(world)
}
