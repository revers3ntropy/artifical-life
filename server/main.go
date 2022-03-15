package Server

import (
	Sim "epq/sim"
	"fmt"
	"log"
	"net/http"
)

const PORT = "8090"

func StartServer(world *Sim.World) {
	fmt.Print("Starting server on port " + PORT + "...\n")

	http.HandleFunc("/get", func(res http.ResponseWriter, req *http.Request) {
		if req.Method != "POST" {
			fmt.Fprintf(res, "404 Invalid method")
			return
		}

		fmt.Print("serving /get\n")

		res.WriteHeader(200)

		res.Header().Set("Access-Control-Allow-Origin", "*")
		res.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		fmt.Fprintf(res, world.SerializeWorldData())
	})

	log.Fatal(http.ListenAndServe(":"+PORT, nil))
}
