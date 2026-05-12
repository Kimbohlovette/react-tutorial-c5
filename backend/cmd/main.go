package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"

	"piggy.com/internal/db/repo"
	"piggy.com/internal/handlers"
	"piggy.com/internal/middleware"
	"piggy.com/internal/piggyservice"
)

func main() {
	// Load environment variables from .env file
	godotenv.Load()

	route := gin.Default()

	// Get environment variables
	dbURL := os.Getenv("DB_URL")
	if dbURL == "" {
		dbURL = "postgres://postgres:postgres@127.0.0.1:5432/piggydb?sslmode=disable"
	}

	frontendURL := os.Getenv("FRONTEND_URL")
	if frontendURL == "" {
		frontendURL = "http://localhost:3000"
	}

	// Configure Cors
	route.Use(cors.New(cors.Config{
		AllowOrigins:     []string{frontendURL},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Healthcheck
	route.GET("/api/v1/healthcheck", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "Healthy!",
		})
	})

	// Initialize repo and apply migrations
	ctx := context.Background()
	dbConn, err := pgxpool.New(ctx, dbURL)
	if err != nil {
		panic(err)
	}
	fmt.Println("Database connection established!")
	repostory := repo.NewRepository(dbConn)
	// Migrations are already applied via Supabase CLI (supabase db push)
	// No need to run MigrateUp here

	// Initialize service
	appService := piggyservice.NewService(repostory)
	handlers := handlers.NewHandler(appService)

	// Define application endpoints

	// Public routes
	route.POST("/api/v1/auth/register", handlers.Register)
	route.POST("/api/v1/auth/login", handlers.Login)

	// Protected routes
	protected := route.Group("/api/v1")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.POST("/transactions", handlers.CreateTransaction)
		protected.GET("/transactions", handlers.GetTransactions)
		protected.GET("/account", handlers.GetUserAccount)
	}

	// Run application
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Printf("Server running on port %s\n", port)
	route.Run(":" + port)
}
