package main

import (
	"social-backend/internal/infrastructure/http"
	"social-backend/internal/infrastructure/logger"
	"social-backend/scripts"

	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load(".env")

	if err := logger.Init(); err != nil {
		panic(err)
	}

	scripts.Migrate()

	http.StartServer()
}
