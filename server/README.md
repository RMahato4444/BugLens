# BugLens Server

Express + MongoDB Atlas + JWT + Groq backend for BugLens.

## Stack

- Node.js / Express
- MongoDB Atlas / Mongoose
- JWT authentication
- bcryptjs password hashing
- Multer memory uploads
- Groq API with `qwen/qwen3.8-27b`

## Run

```powershell
cd server
npm install
Copy-Item .env.example .env
npm run dev
```

## Required environment variables

- `MONGO_URI`
- `JWT_SECRET`
- `GROQ_API_KEY`

The default AI provider is `groq`.

For connectivity testing without calling Groq, temporarily use:

```env
AI_PROVIDER=mock
```
