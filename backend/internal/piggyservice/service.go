package piggyservice

import (
	"context"

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

// define service methods here

func (s *Service) CreateTransaction(ctx context.Context, payload models.CreateTransactionPayload) (*models.Transaction, error) {
	// create the transaction
	transaction, err := s.repo.Do().CreateTransaction(ctx, sqlc.CreateTransactionParams{
		Amount: payload.Amount,
		Type:   &payload.Type,
		Reason: &payload.Reason,
	})
	if err != nil {
		return nil, err
	}
	return sqlCToAppTransaction(transaction), nil
}

func (s *Service) GetTransactions(ctx context.Context) (*[]models.Transaction, error) {
	txns, err := s.repo.Do().GetTransactions(ctx)
	if err != nil {
		return nil, err
	}
	transactions := []models.Transaction{}
	for _, v := range txns {
		transactions = append(transactions, *sqlCToAppTransaction(v))
	}
	return &transactions, nil
}

func sqlCToAppTransaction(t sqlc.Transaction) *models.Transaction {
	return &models.Transaction{
		Amount:    t.Amount,
		Reason:    *t.Reason,
		Type:      *t.Type,
		ID:        &t.ID,
		CreatedAt: t.CreatedAt.Time.String(),
	}
}
