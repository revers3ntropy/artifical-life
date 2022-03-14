package Server

import (
	"fmt"
	"log"
	"net/http"
)

const PORT = "8090"

func StartServer() {
	fmt.Print("Starting server on port " + PORT + "...")

	http.HandleFunc("/", func(res http.ResponseWriter, req *http.Request) {
		fmt.Fprint(res, "hello world")
	})

	log.Fatal(http.ListenAndServe(":"+PORT, nil))
}
