package piggyservice

import (
	"context"
	"fmt"
	"strconv"

	"piggy.com/internal/db/repo"
	"piggy.com/internal/db/sqlc"
	"piggy.com/internal/models"
)

type Service struct {
	repo repo.Repository
}

func NewService(repo repo.Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) CreateUser(ctx context.Context, email, password, name string) (*models.User, error) {
	user, err := s.repo.Do().CreateUser(ctx, sqlc.CreateUserParams{
		Email:    email,
		Password: password,
		Name:     &name,
	})
	if err != nil {
		return nil, fmt.Errorf("failed to create user: %w", err)
	}

	userName := ""
	if user.Name != nil {
		userName = *user.Name
	}

	balance := 0.0
	if user.Balance != nil && *user.Balance != "" {
		b, err := strconv.ParseFloat(*user.Balance, 64)
		if err == nil {
			balance = b
		}
	}

	return &models.User{
		ID:      user.ID,
		Email:   user.Email,
		Name:    userName,
		Balance: balance,
	}, nil
}

func (s *Service) GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
	user, err := s.repo.Do().GetUserByEmail(ctx, email)
	if err != nil {
		return nil, fmt.Errorf("user not found: %w", err)
	}

	userName := ""
	if user.Name != nil {
		userName = *user.Name
	}

	balance := 0.0
	if user.Balance != nil && *user.Balance != "" {
		b, err := strconv.ParseFloat(*user.Balance, 64)
		if err == nil {
			balance = b
		}
	}

	return &models.User{
		ID:       user.ID,
		Email:    user.Email,
		Password: user.Password,
		Name:     userName,
		Balance:  balance,
	}, nil
}

func (s *Service) GetUserByID(ctx context.Context, userID int32) (*models.User, error) {
	user, err := s.repo.Do().GetUserByID(ctx, userID)
	if err != nil {
		return nil, fmt.Errorf("user not found: %w", err)
	}

	userName := ""
	if user.Name != nil {
		userName = *user.Name
	}

	balance := 0.0
	if user.Balance != nil && *user.Balance != "" {
		b, err := strconv.ParseFloat(*user.Balance, 64)
		if err == nil {
			balance = b
		}
	}

	return &models.User{
		ID:       user.ID,
		Email:    user.Email,
		Password: user.Password,
		Name:     userName,
		Balance:  balance,
	}, nil
}

func (s *Service) GetUserAccountInfo(ctx context.Context, userID int32) (*models.UserAccountInfo, error) {
	user, err := s.repo.Do().GetUserAccountInfo(ctx, userID)
	if err != nil {
		return nil, fmt.Errorf("failed to get user account info: %w", err)
	}

	userName := ""
	if user.Name != nil {
		userName = *user.Name
	}

	balance := 0.0
	if user.Balance != nil && *user.Balance != "" {
		b, err := strconv.ParseFloat(*user.Balance, 64)
		if err == nil {
			balance = b
		}
	}

	return &models.UserAccountInfo{
		ID:        user.ID,
		Email:     user.Email,
		Name:      userName,
		Balance:   balance,
		CreatedAt: user.CreatedAt.String(),
	}, nil
}

func (s *Service) CreateTransaction(ctx context.Context, userID int32, payload models.CreateTransactionPayload) (*models.Transaction, error) {
	// Get current balance
	currentBalance, err := s.repo.Do().GetUserBalance(ctx, userID)
	if err != nil {
		return nil, fmt.Errorf("failed to get user balance: %w", err)
	}

	// Parse amount
	amountFloat, err := strconv.ParseFloat(payload.Amount, 64)
	if err != nil {
		return nil, fmt.Errorf("invalid amount: %w", err)
	}

	// Calculate new balance based on transaction type
	var newBalance float64
	currentBalanceFloat := 0.0
	if currentBalance != nil && *currentBalance != "" {
		b, err := strconv.ParseFloat(*currentBalance, 64)
		if err == nil {
			currentBalanceFloat = b
		}
	}

	if payload.Type == models.TypeSaving {
		newBalance = currentBalanceFloat + amountFloat
	} else if payload.Type == models.TypeWithdrawal {
		newBalance = currentBalanceFloat - amountFloat
		if newBalance < 0 {
			return nil, fmt.Errorf("insufficient balance for withdrawal")
		}
	} else {
		return nil, fmt.Errorf("invalid transaction type")
	}

	// Update user balance
	if err := s.repo.Do().UpdateUserBalance(ctx, sqlc.UpdateUserBalanceParams{
		ID:      userID,
		Balance: strconv.FormatFloat(newBalance, 'f', 2, 64),
	}); err != nil {
		return nil, fmt.Errorf("failed to update balance: %w", err)
	}

	// Create transaction record
	transaction, err := s.repo.Do().CreateTransaction(ctx, sqlc.CreateTransactionParams{
		Amount: payload.Amount,
		Type:   &payload.Type,
		Reason: &payload.Reason,
		UserID: &userID,
	})
	if err != nil {
		return nil, err
	}

	return &models.Transaction{
		Amount:    transaction.Amount,
		Reason:    getStringValue(transaction.Reason),
		Type:      getStringValue(transaction.Type),
		ID:        &transaction.ID,
		CreatedAt: transaction.CreatedAt.String(),
		UserID:    transaction.UserID,
	}, nil
}

func (s *Service) GetTransactions(ctx context.Context) (*[]models.Transaction, error) {
	txns, err := s.repo.Do().GetTransactions(ctx)
	if err != nil {
		return nil, err
	}

	transactions := []models.Transaction{}
	for _, v := range txns {
		transactions = append(transactions, models.Transaction{
			Amount:    v.Amount,
			Reason:    getStringValue(v.Reason),
			Type:      getStringValue(v.Type),
			ID:        &v.ID,
			CreatedAt: v.CreatedAt.String(),
			UserID:    v.UserID,
		})
	}

	return &transactions, nil
}

func (s *Service) GetTransactionsByUserID(ctx context.Context, userID int32) (*[]models.Transaction, error) {
	userIDPtr := &userID
	txns, err := s.repo.Do().GetTransactionsByUserID(ctx, userIDPtr)
	if err != nil {
		return nil, fmt.Errorf("failed to get user transactions: %w", err)
	}

	transactions := []models.Transaction{}
	for _, v := range txns {
		transactions = append(transactions, models.Transaction{
			Amount:    v.Amount,
			Reason:    getStringValue(v.Reason),
			Type:      getStringValue(v.Type),
			ID:        &v.ID,
			CreatedAt: v.CreatedAt.String(),
			UserID:    v.UserID,
		})
	}

	return &transactions, nil
}

// Helper function to safely extract string from pointer
func getStringValue(s *string) string {
	if s != nil {
		return *s
	}
	return ""
}

// This function is no longer needed but kept for reference
func sqlCToAppTransaction(t sqlc.Transaction) *models.Transaction {
	reason := ""
	if t.Reason != nil {
		reason = *t.Reason
	}

	typeStr := ""
	if t.Type != nil {
		typeStr = *t.Type
	}

	createdAt := ""
	if !t.CreatedAt.IsZero() {
		createdAt = t.CreatedAt.String()
	}

	return &models.Transaction{
		Amount:    t.Amount,
		Reason:    reason,
		Type:      typeStr,
		ID:        &t.ID,
		CreatedAt: createdAt,
	}
}
