package models

type User struct {
	ID       int32 `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
}

type LoginPayload struct {
	Email    string `json:"email"`
	Password string `json:"name"`
}

type RegisterPayload struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
}

type AuthResponse struct {
	Token string `json:"token"`
	User  User `json:"user"`
}

type CreateTransactionPayload struct {
	Amount    string `json:"amount"`
	Type      string `json:"type"`
	Reason    string `json:"reason"`
}

type Transaction struct {
	ID        *int32 `json:"id"`
	Amount    string `json:"amount"`
	Type      string `json:"type"`
	Reason    string `json:"reason"`
	CreatedAt string `json:"createdAt"`
}

const (
	TypeSaving     = "saving"
	TypeWithdrawal = "withdrawal"
)
