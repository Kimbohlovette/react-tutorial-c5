package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"piggy.com/internal/models"
	"piggy.com/internal/piggyservice"
)

type Handler struct {
	service *piggyservice.Service
}

func NewHandler(service *piggyservice.Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) CreateTransaction(c *gin.Context) {
	var payload models.CreateTransactionPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get user ID from context (set by auth middleware)
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in context"})
		return
	}

	transaction, err := h.service.CreateTransaction(c, userID.(int32), payload)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, transaction)
}

func (h *Handler) GetTransactions(c *gin.Context) {
	// Get user ID from context (set by auth middleware)
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in context"})
		return
	}

	transactions, err := h.service.GetTransactionsByUserID(c, userID.(int32))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, transactions)
}

func (h *Handler) GetUserAccount(c *gin.Context) {
	// Get user ID from context (set by auth middleware)
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in context"})
		return
	}

	accountInfo, err := h.service.GetUserAccountInfo(c, userID.(int32))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, accountInfo)
}
