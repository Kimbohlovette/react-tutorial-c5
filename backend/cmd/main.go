package main

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"

	"piggy.com/internal/models"
)

func main() {
	route := gin.Default()

	// Configure Cors
	route.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
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

	route.POST("/api/v1/transactions", func(ctx *gin.Context) {

		payload := &models.CreateTransactionPayload{}
		ctx.MustBindWith(payload, binding.JSON)

		//validate request body (payload)
		amount, err := strconv.ParseInt(payload.Amount, 10, 32)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"message": "Invalid amount",
			})
			return
		}
		if amount < 1 {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"message": "Cannot save or withdraw a negative amount",
			})
			return
		}
		if payload.Type != "saving" && payload.Type != "withdrawal" {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"message": "Invalid transaction type",
			})
			return
		}
		//TODO: collect and save into the database
		// write a response
		ctx.JSON(http.StatusOK, gin.H{
			"message": "success",
			"created": payload,
		})
	})

route.GET("/api/v1/transactions", func(ctx *gin.Context) {
	queryType := ctx.Query("type")
	querySize := ctx.Query("size")

	// Start with all transactions
	filtered := transactions

	// Filter by type
	if queryType != "" {
		temp := []models.Transaction{}
		for _, v := range filtered {
			if v.Type == queryType {
				temp = append(temp, v)
			}
		}
		filtered = temp
	}

	// Apply size limit
	if querySize != "" {
		size, err := strconv.Atoi(querySize)
		if err != nil || size < 0 {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"message": "Bad request: size query param is not valid",
			})
			return
		}

		if size < len(filtered) {
			filtered = filtered[:size]
		}
	}

	// Default fallback (no params)
	if queryType == "" && querySize == "" {
		if len(filtered) > 20 {
			filtered = filtered[:20] 
		}
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message":      "success",
		"transactions": filtered,
	})
})	// Run application
	fmt.Println("Server running on port 8080")
	route.Run()
}

var transactions = []models.Transaction{
	{Amount: "5000", Reason: "Salary", CreatedAt: "2026-01-01T08:00:00Z", Type: models.TypeSaving},
	{Amount: "1500", Reason: "Groceries", CreatedAt: "2026-01-02T10:30:00Z", Type: models.TypeWithdrawal},
	{Amount: "2000", Reason: "Freelance work", CreatedAt: "2026-01-03T14:15:00Z", Type: models.TypeSaving},
	{Amount: "800", Reason: "Transport", CreatedAt: "2026-01-04T07:45:00Z", Type: models.TypeWithdrawal},
	{Amount: "1200", Reason: "Gift received", CreatedAt: "2026-01-05T12:00:00Z", Type: models.TypeSaving},
	{Amount: "600", Reason: "Snacks", CreatedAt: "2026-01-06T16:20:00Z", Type: models.TypeWithdrawal},
	{Amount: "3000", Reason: "Bonus", CreatedAt: "2026-01-07T09:10:00Z", Type: models.TypeSaving},
	{Amount: "1000", Reason: "Electricity bill", CreatedAt: "2026-01-08T11:00:00Z", Type: models.TypeWithdrawal},
	{Amount: "700", Reason: "Internet subscription", CreatedAt: "2026-01-09T18:30:00Z", Type: models.TypeWithdrawal},
	{Amount: "2500", Reason: "Side hustle", CreatedAt: "2026-01-10T13:00:00Z", Type: models.TypeSaving},

	{Amount: "400", Reason: "Lunch", CreatedAt: "2026-01-11T12:20:00Z", Type: models.TypeWithdrawal},
	{Amount: "1800", Reason: "Project payment", CreatedAt: "2026-01-12T15:45:00Z", Type: models.TypeSaving},
	{Amount: "900", Reason: "Fuel", CreatedAt: "2026-01-13T08:30:00Z", Type: models.TypeWithdrawal},
	{Amount: "2200", Reason: "Consulting", CreatedAt: "2026-01-14T10:10:00Z", Type: models.TypeSaving},
	{Amount: "500", Reason: "Drinks", CreatedAt: "2026-01-15T19:00:00Z", Type: models.TypeWithdrawal},
	{Amount: "3500", Reason: "Investment return", CreatedAt: "2026-01-16T09:00:00Z", Type: models.TypeSaving},
	{Amount: "1200", Reason: "Shopping", CreatedAt: "2026-01-17T17:25:00Z", Type: models.TypeWithdrawal},
	{Amount: "2700", Reason: "Online sales", CreatedAt: "2026-01-18T11:40:00Z", Type: models.TypeSaving},
	{Amount: "650", Reason: "Taxi", CreatedAt: "2026-01-19T06:50:00Z", Type: models.TypeWithdrawal},
	{Amount: "3100", Reason: "Contract payment", CreatedAt: "2026-01-20T14:00:00Z", Type: models.TypeSaving},

	{Amount: "450", Reason: "Coffee", CreatedAt: "2026-01-21T08:10:00Z", Type: models.TypeWithdrawal},
	{Amount: "2000", Reason: "Savings deposit", CreatedAt: "2026-01-22T10:00:00Z", Type: models.TypeSaving},
	{Amount: "950", Reason: "Dinner", CreatedAt: "2026-01-23T20:00:00Z", Type: models.TypeWithdrawal},
	{Amount: "4000", Reason: "Business income", CreatedAt: "2026-01-24T09:30:00Z", Type: models.TypeSaving},
	{Amount: "1100", Reason: "Medical expenses", CreatedAt: "2026-01-25T13:20:00Z", Type: models.TypeWithdrawal},
	{Amount: "2800", Reason: "App revenue", CreatedAt: "2026-01-26T16:00:00Z", Type: models.TypeSaving},
	{Amount: "750", Reason: "Utilities", CreatedAt: "2026-01-27T07:00:00Z", Type: models.TypeWithdrawal},
	{Amount: "3300", Reason: "Client payment", CreatedAt: "2026-01-28T15:00:00Z", Type: models.TypeSaving},
	{Amount: "600", Reason: "Gym", CreatedAt: "2026-01-29T18:45:00Z", Type: models.TypeWithdrawal},
	{Amount: "5000", Reason: "Annual bonus", CreatedAt: "2026-01-30T12:00:00Z", Type: models.TypeSaving},
}
