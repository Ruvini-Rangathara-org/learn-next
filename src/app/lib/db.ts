import { Pool } from "pg";

// Create a database connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// Connect to the database (using the pool)
export const connectToDatabase = async () => {
  const client = await pool.connect();
  return client;
};

// Disconnect from the database
export const disconnectFromDatabase = async () => {
  await pool.end();  // Close the pool when you're done
};
