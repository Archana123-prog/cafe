# Campus Bites

The project is split into `frontend/` and `backend/`. The frontend is a Vite/React PWA; the backend is an Express API connected to Neon PostgreSQL.

## Frontend

```powershell
cd frontend
npm install
npm run dev
```

The app runs at http://localhost:5173. Build and preview it with `npm run build` and `npm run preview` from `frontend/`.

Customize the cafe details in `frontend/src/config.js`, menu items in `frontend/src/data/menu.js`, and assets in `frontend/public/`.

## Backend

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

Set `DATABASE_URL` in `backend/.env` to your Neon connection string. The API starts at http://localhost:4000 and exposes `GET /api/health`, which checks the database connection. On startup, the backend logs the connected database name.

## Deployment

- **Vercel:** Set the project root to `frontend`, framework to Vite, build command to `npm run build`, and output directory to `dist`.
- **Render:** Create a Web Service with root directory `backend`, build command `npm install`, and start command `npm start`. Configure `DATABASE_URL` and `FRONTEND_URL` in the Render environment. Use your deployed Vercel URL for `FRONTEND_URL`.
- **Neon:** Use the PostgreSQL connection string from Neon as `DATABASE_URL`. Keep credentials in environment variables, never in source files.
