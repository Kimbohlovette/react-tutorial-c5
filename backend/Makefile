run-app:
	go run ./cmd

# Push migrations to Supabase
push-migrations:
	npx supabase db push

# Pull schema from Supabase (after migrations)
pull-schema:
	npx supabase pull

# Link to Supabase project
link-supabase:
	npx supabase link --project-ref yvilrtqhewhbyzrwfjkn

# Login to Supabase
login-supabase:
	npx supabase login

# Check Supabase status
status:
	npx supabase projects list