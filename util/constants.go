package util

import (
	"encoding/json"
	"fmt"
)

type SimConfig struct {
	NumAgents   int
	SpawnBounds [4]float64
}

var Config SimConfig

func LoadConfig(configJSON []byte) {
	err := json.Unmarshal(configJSON, &Config)
	if err != nil {
		fmt.Print(err)
		return
	}
}
