-- name: CreateTransaction :one
INSERT INTO transactions (amount, type, reason, user_id)
VALUES ($1, $2, $3, $4)
RETURNING id, amount, type, reason, created_at, user_id;

-- name: GetTransactions :many
SELECT id, amount, type, reason, created_at, user_id 
FROM transactions
ORDER BY created_at DESC;

-- name: GetTransactionByID :one
SELECT id, amount, type, reason, created_at, user_id 
FROM transactions
WHERE id = $1;