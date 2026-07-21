# Deployment Guide - AgriSense AI

AgriSense AI is designed for 100% free production deployment using Render, Vercel, and Cloudinary.

## 1. Backend Deployment (Render)
1. Push code to GitHub repository (`https://github.com/gyana10/AgriSense-AI.git`).
2. Log in to [Render](https://render.com/) and create a new **Web Service**.
3. Select your repository and set Root Directory to `backend`.
4. Environment: `Python 3`.
5. Build Command: `pip install -r requirements.txt && alembic upgrade head`
6. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
7. Add Environment Variables (`SECRET_KEY`, `DATABASE_URL`, `GEMINI_API_KEY`).

## 2. Frontend Deployment (Vercel)
1. Log in to [Vercel](https://vercel.com/) and import the repository.
2. Select Root Directory as `frontend`.
3. Framework Preset: `Vite`.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Add Environment Variable: `VITE_API_URL=https://<your-render-backend-url>/api/v1`.

## 3. Local Docker Compose Deployment
```bash
docker-compose up --build
```
- Frontend: `http://localhost`
- Backend Swagger API: `http://localhost:8000/docs`
