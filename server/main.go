package main

import (
	"fmt"
	"net/http"

	"lapisoAuth.com/auth"
	"lapisoAuth.com/db"
)

func main() {
	conn, err := db.ConnectPG()
	if err != nil {
		fmt.Println(err.Error())
	}

	connection := auth.Connection{
		Conn: conn,
	}

	http.HandleFunc("/api/login", connection.Login)
	http.HandleFunc("/api/register", connection.Register)

	fmt.Println("Listening on 6766...")
	http.ListenAndServe(":6766", nil)
}
