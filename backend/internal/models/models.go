package models

type User struct {
	ID	string `json:"id"`
	Username	string `json:"username"`
	Email	string `json:"email"`
	CreatedAt	string `json:"createdAt"`
	UpdatedAt	string `json:"updatedAt"`
	DeletedAt	string `json:"deletedAt"`
}

type CreateUserPayload struct {
	Username    string `json:"username" binding:"required"`
	Email      string `json:"email" binding:"required"`
	Password    string `json:"password" binding:"required"`
}

type GetUserPayload struct{
	Identifier string `json:"identifier" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type GetUserResponse struct {
	Token string `json:"token"`
	User User `json:"user"`
}

type CreateTransactionPayload struct {
	CreatedBy string `json:"CreatedBy"`
	Amount    string `json:"amount"`
	Type      string `json:"type"`
	Reason    string `json:"reason"`
}

type Transaction struct {
	ID        string `json:"id"`
	Amount    string `json:"amount"`
	Type      string `json:"type"`
	Reason    string `json:"reason"`
	CreatedAt string `json:"createdAt"`
}

const (
	TypeSaving     = "saving"
	TypeWithdrawal = "withdrawal"
)
