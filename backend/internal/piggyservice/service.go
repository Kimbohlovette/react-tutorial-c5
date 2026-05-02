package piggyservice

import (
	"context"
	"errors"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"piggy.com/internal/db/repo"
	"piggy.com/internal/db/sqlc"
	"piggy.com/internal/models"
)

type Service struct {
	repo repo.Repository
	jwtSecret string
}

func NewService(repo repo.Repository, jwtSecret string) *Service {
	return &Service{repo: repo, jwtSecret: jwtSecret}
}

// define service methods here
func (s *Service) CreateUser(ctx context.Context, payload models.CreateUserPayload) (*models.User, error) {
	// create user
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(payload.Password),bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	user, err := s.repo.Do().CreateUser(ctx, sqlc.CreateUserParams{
		Username: payload.Username,
		Email:   payload.Email,
		Password: string(hashedPassword),
	})
	if err != nil {
		return nil, err
	}
	return sqlCToAppUser(user), nil
}


func (s *Service) CreateTransaction(ctx context.Context, payload models.CreateTransactionPayload) (*models.Transaction, error) {
	// create the transaction
	transaction, err := s.repo.Do().CreateTransaction(ctx, sqlc.CreateTransactionParams{
		CreatedBy: &payload.CreatedBy,
		Amount: payload.Amount,
		Type:   &payload.Type,
		Reason: &payload.Reason,
	})
	if err != nil {
		return nil, err
	}
	return sqlCToAppTransaction(transaction), nil
}

func (s *Service) GetUser(ctx context.Context, payload models.GetUserPayload) (*models.GetUserResponse, error) {
	var dbUser sqlc.User
	var err error
	
	if strings.Contains(payload.Identifier, "@"){
		dbUser, err = s.repo.Do().GetUserByEmail(ctx, payload.Identifier)
	} else {
		dbUser, err = s.repo.Do().GetUserByUsername(ctx, payload.Identifier)
	}

	if err != nil {
		return nil, errors.New("Invalid Credentials")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(dbUser.Password), []byte(payload.Password)); err != nil {
		return nil, errors.New("Invalid Credentials")
	}

	token, err := s.generateJWT(dbUser.UserID, dbUser.Username)
	if err != nil {
		return nil, err
	}

	return &models.GetUserResponse{
		Token: token,
		User: *sqlCToAppUser(dbUser),
	}, nil
}

func (s *Service) generateJWT(userID string, username string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"username": username,
		"exp": time.Now().Add(24 * time.Hour).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(s.jwtSecret))
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

func (s *Service) GetUserTransactions(ctx context.Context, userID string) (*[]models.Transaction, error) {
	txns, err := s.repo.Do().GetUserTransactions(ctx, &userID)
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
		ID:        t.TransID,
		CreatedAt: t.CreatedAt.Time.String(),
	}
}

func sqlCToAppUser(u sqlc.User) *models.User {
	return &models.User{
		ID:    u.UserID,
		Username:  u.Username,
		Email:     u.Email,
		CreatedAt:       u.CreatedAt.Time.String(),
		//add updated_at and deleted_at only when implementing user account management
	}
}

