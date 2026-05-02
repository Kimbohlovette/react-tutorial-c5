-- name: CreateTransaction :one
INSERT INTO transactions (created_by, amount, reason, type) VALUES ($1, $2, $3, $4) RETURNING *;

-- name: GetTransactions :many
SELECT * FROM transactions;

-- name: CreateUser :one
INSERT INTO users (username, email, password)
VALUES ($1, $2, $3)
RETURNING *;

-- name: GetUserByEmail :one
SELECT * FROM users
WHERE email = $1 
LIMIT 1;

-- name: GetUserByUsername :one
SELECT * FROM users
WHERE username = $1 
LIMIT 1;

-- name: GetUserTransactions :many
SELECT * FROM transactions
WHERE created_by = $1;
