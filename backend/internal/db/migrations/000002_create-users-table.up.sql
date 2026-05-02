CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	name VARCHAR(255), 
	created_at TIMESTAMP DEFAULT NOW()
);

-- add user_id to transaction table
ALTER TABLE transactions ADD COLUMN user_id INTEGER REFERENCES users(id);