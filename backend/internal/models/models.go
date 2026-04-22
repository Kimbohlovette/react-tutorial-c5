package models

type User struct {
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
