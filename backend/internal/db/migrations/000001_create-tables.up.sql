CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  amount VARCHAR(255) NOT NULL,
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  type VARCHAR(25)
);