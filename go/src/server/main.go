package Server

import (
	"epq/src/sim"
	util2 "epq/src/util"
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

func setupResponse(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func StartServer(World *Sim.World, port string) {
	fmt.Print("Starting server on port " + port + "...\n")

	var connections []*websocket.Conn

	var removeConn = func(conn *websocket.Conn) {
		for i, other := range connections {
			if other == conn {
				connections = append(connections[:i], connections[i+1:]...)
			}
		}
	}

	http.HandleFunc("/get", func(w http.ResponseWriter, r *http.Request) {
		setupResponse(&w)
		if (*r).Method == "OPTIONS" {
			return
		}

		if r.Method != "POST" {
			_, err := fmt.Fprintf(w, "Invalid method")
			if err != nil {
				fmt.Println(err)
			}
			return
		}
		_, err := fmt.Fprintf(w, World.SerializeWorldData())
		if err != nil {
			fmt.Println(err)
		}
	})

	http.HandleFunc("/start-connection", func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			fmt.Println(err)
			return
		}

		connections = append(connections, conn)
	})

	gl := util2.GameLoop{
		OnUpdate: func(delta float64) {
			if len(connections) < 1 {
				return
			}

			data := []byte(World.SerializeWorldData())

			for _, conn := range connections {
				if err := conn.WriteMessage(websocket.TextMessage, data); err != nil {
					removeConn(conn)
					log.Println(err)
					return
				}
			}
		},
		TickRate: util2.ServerUpdateRate,
		Quit:     make(chan bool),
	}
	gl.Start()

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
