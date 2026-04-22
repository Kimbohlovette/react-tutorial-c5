-- name: CreateTransaction :one
INSERT INTO transactions (amount, reason, type) VALUES ($1, $2, $3) RETURNING *;

-- name: GetTransactions :many
SELECT * FROM transactions;