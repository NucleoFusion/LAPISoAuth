package auth

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"net/url"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/crypto/bcrypt"
	"lapisoAuth.com/models"
)

type Connection struct {
	Conn *pgxpool.Pool
}

type ErrorResponse struct {
	Message string
}

type LoginResponse struct {
	Message string
	Id      int
	Name    string
	Email   string
}

func (c *Connection) Login(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	w.Header().Add("Content-Type", "application/json")

	queries := r.URL.Query()

	mapQueries := UrlToMap(queries)

	ok := CheckParams(mapQueries, true)
	if !(ok) {
		ReplyError("Invalid Parameters", w)
		return
	}

	email := mapQueries["email"]
	password := mapQueries["password"]

	row, err := c.Conn.Query(context.Background(), "SELECT * FROM users WHERE email = $1", email)
	if err != nil {
		ReplyError("User Does Not Exist", w)
		return
	}

	user, err := pgx.CollectOneRow(row, pgx.RowToStructByName[models.UserData])
	if err != nil {
		if err.Error() == "no rows in result set" {
			ReplyError("User Not Found", w)
			return
		}
		ReplyError(err.Error(), w)
		return
	}

	hashErr := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if hashErr != nil {
		if hashErr.Error() == "crypto/bcrypt: hashedPassword is not the hash of the given password" {
			ReplyError("Invalid Password", w)
			return
		}
		ReplyError(hashErr.Error(), w)
		return
	}

	resp := LoginResponse{
		Message: "Authenticated",
		Name:    user.Name,
		Email:   user.Email,
		Id:      user.Id,
	}

	data, _ := json.Marshal(resp)

	io.Writer.Write(w, data)
}

func (c *Connection) Register(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	w.Header().Add("Content-Type", "application/json")

	queries := r.URL.Query()

	mapQueries := UrlToMap(queries)

	ok := CheckParams(mapQueries, false)
	if !(ok) {
		ReplyError("Invalid Parameters", w)
		return
	}

	name := mapQueries["name"]
	email := mapQueries["email"]
	password := mapQueries["password"]

	hashed, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		ReplyError(err.Error(), w)
		return
	}
	hashedPass := string(hashed)

	var exists bool
	c.Conn.QueryRow(context.Background(), "SELECT EXISTS(SELECT * FROM users WHERE email = $1)", email).Scan(&exists)
	if exists {
		ReplyError("User Already Exists", w)
		return
	}

	row, _ := c.Conn.Query(context.Background(), "INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *", name, email, hashedPass)

	user, err := pgx.CollectOneRow(row, pgx.RowToStructByName[models.UserData])
	if err != nil {
		ReplyError(err.Error(), w)
		return
	}

	data, _ := json.Marshal(user)

	io.Writer.Write(w, data)
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func CheckParams(mapQueries map[string]string, ignore bool) bool {
	_, okN := mapQueries["name"]
	_, okE := mapQueries["email"]
	_, okP := mapQueries["password"]

	if ignore {
		return okE && okP
	}

	return okN && okE && okP
}

func UrlToMap(queries url.Values) map[string]string {
	newMap := map[string]string{}
	for key, val := range queries {
		newMap[key] = val[0]
	}

	return newMap
}

func ReplyError(message string, w http.ResponseWriter) {
	resp := ErrorResponse{
		Message: message,
	}
	respJson, _ := json.Marshal(resp)
	io.Writer.Write(w, respJson)
}
