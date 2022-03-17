package Server

import (
	Sim "epq/sim"
	"epq/util"
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

func StartServer(world *Sim.World) {
	fmt.Print("Starting server on port " + util.Port + "...\n")

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
			fmt.Fprintf(w, "404 Invalid method")
			return
		}

		fmt.Fprintf(w, world.SerializeWorldData())
	})

	http.HandleFunc("/start-connection", func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)

		if err != nil {
			fmt.Println(err)
			return
		}

		connections = append(connections, conn)
	})

	gl := util.GameLoop{
		OnUpdate: func(delta float64) {
			data := []byte(world.SerializeWorldData())
			for _, conn := range connections {
				if err := conn.WriteMessage(websocket.TextMessage, data); err != nil {
					removeConn(conn)
					log.Println(err)
					return
				}
			}
		},
		TickRate: world.Config.ServerUpdateRate,
		Quit:     make(chan bool),
	}
	gl.Start()

	log.Fatal(http.ListenAndServe(":"+util.Port, nil))
}
