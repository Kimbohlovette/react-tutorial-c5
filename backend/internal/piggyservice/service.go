package piggyservice

import (
	"context"
	"fmt"

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

	return &models.User{
		ID:    user.ID,
		Email: user.Email,
		Name:  userName,
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

	return &models.User{
		ID:       user.ID,
		Email:    user.Email,
		Password: user.Password,
		Name:     userName,
	}, nil
}

func (s *Service) CreateTransaction(ctx context.Context, payload models.CreateTransactionPayload) (*models.Transaction, error) {
	transaction, err := s.repo.Do().CreateTransaction(ctx, sqlc.CreateTransactionParams{
		Amount: payload.Amount,
		Type:   &payload.Type,
		Reason: &payload.Reason,
	})
	if err != nil {
		return nil, err
	}
	
	// Convert the CreateTransactionRow to our model
	return &models.Transaction{
		Amount:    transaction.Amount,
		Reason:    getStringValue(transaction.Reason),
		Type:      getStringValue(transaction.Type),
		ID:        &transaction.ID,
		CreatedAt: transaction.CreatedAt.String(),
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