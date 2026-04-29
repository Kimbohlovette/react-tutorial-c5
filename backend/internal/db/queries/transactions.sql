-- name: CreateTransaction :one
INSERT INTO transactions (amount, reason, type) VALUES ($1, $2, $3) RETURNING *;

-- name: GetTransactions :many
SELECT * FROM transactions
WHERE (CAST(@type_filter AS TEXT) = '' OR type = @type_filter)
ORDER BY created_at DESC;