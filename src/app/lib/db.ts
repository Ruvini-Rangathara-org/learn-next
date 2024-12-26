import { Pool } from "pg";

// Create a single pool instance for the app
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// Function to get a client from the pool
export const connectToDatabase = async () => {
  return await pool.connect();
};

// Function to end the pool during app shutdown
export const disconnectFromDatabase = async () => {
  await pool.end();
};
