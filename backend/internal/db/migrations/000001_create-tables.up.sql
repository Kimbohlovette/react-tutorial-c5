
CREATE TABLE IF NOT EXISTS "users" (
  "user_id" VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  "username" VARCHAR(255) UNIQUE NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP,
  "deleted_at" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "transactions" (
  "trans_id" VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  "created_by" VARCHAR(36) REFERENCES users(user_id) ON DELETE CASCADE, 
  "amount" VARCHAR(255) NOT NULL,
  "reason" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "type" VARCHAR(25)
);

CREATE INDEX idx_transactions_created_by ON transactions(created_by);

