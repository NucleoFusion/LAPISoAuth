package db

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

func ConnectPG() (*pgxpool.Pool, error) {
	godotenv.Load(".env")

	dbpool, err := pgxpool.New(context.Background(), os.Getenv("PG_DO_URI"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to create connection pool: %v\n", err)
		return dbpool, err
	}

	return dbpool, nil
}
