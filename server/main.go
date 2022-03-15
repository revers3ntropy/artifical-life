package Server

import (
	Sim "epq/sim"
	"fmt"
	"log"
	"net/http"
)

const PORT = "8090"

func setupResponse(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func StartServer(world *Sim.World) {
	fmt.Print("Starting server on port " + PORT + "...\n")

	http.HandleFunc("/get", func(w http.ResponseWriter, r *http.Request) {
		setupResponse(&w)
		if (*r).Method == "OPTIONS" {
			return
		}

		if r.Method != "POST" {
			fmt.Fprintf(w, "404 Invalid method")
			return
		}

		fmt.Println(world.SerializeWorldData())

		fmt.Fprintf(w, world.SerializeWorldData())
	})

	log.Fatal(http.ListenAndServe(":"+PORT, nil))
}
