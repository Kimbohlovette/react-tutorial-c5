package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/ardanlabs/conf/v3"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/rs/zerolog"

	"piggy.com/internal/db/repo"
	"piggy.com/internal/handlers"
	"piggy.com/internal/initializers"
	"piggy.com/internal/piggyservice"
)


type DBConfig struct {
    DBUser      string `conf:"env:DB_USER,required"`
    DBPassword  string `conf:"env:DB_PASSWORD,required,mask"`
    DBHost      string `conf:"env:DB_HOST,required"`
    DBPort      uint16 `conf:"env:DB_PORT,required"`
    DBName      string `conf:"env:DB_NAME,required"`
    TLSDisabled bool   `conf:"env:DB_TLS_DISABLED"`
	JWTSecret string `conf:"env:JWT_SECRET,required,mask"`
	FRONTENDURL string `conf:"env:FRONTEND_URL,required,mask"`
}

func main() {
	//load env file 
	initializers.LoadEnvs()

	var cfg DBConfig

    // reads from env variables automatically
    config, err := conf.Parse("", &cfg)
    if err != nil {
        if err == conf.ErrHelpWanted {
            fmt.Println(config)
            return
        }
        log.Fatal("Failed to parse config:", err)
    }

	route := gin.Default()

	// Configure Cors
	route.Use(cors.New(cors.Config{
		AllowOrigins:     []string{cfg.FRONTENDURL},
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
	dbUrl := fmt.Sprintf("postgres://%s:%s@%s:%d/%s?sslmode=disable",
    cfg.DBUser,
    cfg.DBPassword,
    cfg.DBHost,
    cfg.DBPort,
    cfg.DBName,
)
	dbConn, err := pgxpool.New(ctx, dbUrl)
	if err != nil {
		panic(err)
	}
	fmt.Println("Database connection established!")
	repostory := repo.NewRepository(dbConn)
	if err :=repo.MigrateUp(dbUrl, "./internal/db/migrations", zerolog.Nop().With().Logger());err !=nil{
		panic(err)
	}

	// Initialize service
	appService := piggyservice.NewService(repostory, cfg.JWTSecret)
	handlers := handlers.NewHandler(appService)

	// Define application endpoints
	route.POST("/api/v1/register", handlers.CreateUser)
	route.POST("/api/v1/login", handlers.GetUser)
	route.POST("/api/v1/transactions", handlers.CreateTransaction)
	route.GET("/api/v1/transactions", handlers.GetTransactions) // Run application
	fmt.Println("Server running on port 8080")
	route.Run()
}