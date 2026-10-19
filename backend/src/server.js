import "dotenv/config";
import cors from "cors";
import express from "express";
import pg from "pg";

const app = express();
const port = process.env.PORT || 4000;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

pool.on("error", (error) => {
  console.error("PostgreSQL connection error:", error.message);
});

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", async (_request, response) => {
  try {
    const result = await pool.query("SELECT current_database() AS database");
    response.json({ status: "ok", database: { status: "connected", name: result.rows[0].database } });
  } catch (error) {
    console.error("Database health check failed:", error.message);
    response.status(503).json({ status: "error", database: "disconnected" });
  }
});

async function startServer() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set");
  }

  const result = await pool.query("SELECT current_database() AS database");
  console.log(`Neon PostgreSQL connected to database: ${result.rows[0].database}`);
  app.listen(port, () => {
    console.log(`Backend API listening at http://localhost:${port}`);
    console.log(`Health check: http://localhost:${port}/api/health`);
  });
}

startServer().catch((error) => {
  console.error("Could not start the API:", error.message);
  process.exitCode = 1;
});