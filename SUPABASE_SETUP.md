# Supabase Integration Setup Guide

## ✅ Completed

- [x] Migrations pushed to Supabase database
- [x] Backend files updated to use Supabase connection string
- [x] Frontend environment variables configured
- [x] Supabase tables created (users, transactions)

## 📋 Required Setup

### Step 1: Get Supabase Database Password

1. Go to https://supabase.com/dashboard
2. Select project: **react-tutorial-c5**
3. Navigate to **Settings → Database → Connection info**
4. Copy the password or click "Reset Password" if needed

### Step 2: Update Backend .env File

Replace `your-supabase-password` in `/workspaces/react-tutorial-c5/backend/.env`:

```
DB_URL=postgresql://postgres.yvilrtqhewhbyzrwfjkn:YOUR_PASSWORD_HERE@db.yvilrtqhewhbyzrwfjkn.supabase.co:5432/postgres?sslmode=require
```

### Step 3: Verify Frontend .env.local

File: `/workspaces/react-tutorial-c5/frontend/.env.local`

Already contains:
```
NEXT_PUBLIC_SUPABASE_URL=https://yvilrtqhewhbyzrwfjkn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

✅ Frontend is ready!

## 🚀 Running the Application

### Terminal 1 - Backend:
```bash
cd /workspaces/react-tutorial-c5/backend
# Update .env with your Supabase password first!
go run ./cmd/main.go
```

### Terminal 2 - Frontend:
```bash
cd /workspaces/react-tutorial-c5/frontend
npm run dev
```

### Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api/v1
- Healthcheck: http://localhost:8080/api/v1/healthcheck

## 🗄️ Database Schema

**users table:**
- id (PRIMARY KEY)
- email (UNIQUE)
- password
- name
- balance (DECIMAL)
- created_at

**transactions table:**
- id (PRIMARY KEY)
- user_id (FOREIGN KEY → users.id)
- amount
- reason
- type
- created_at

## 🔗 Architecture

```
Frontend (Next.js) 
    ↓
Go Backend (Port 8080)
    ↓
Supabase PostgreSQL
```

## ✨ Features Working

- User registration & login
- View account balance
- Create transactions
- View transaction history
