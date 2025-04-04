// config/db.js
import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const { Pool } = pg;

// PostgreSQL Connection Configuration
const pool = new Pool({
    user: process.env.DB_USER,  // Database username from .env
    host: process.env.DB_HOST, // Database server
    database: process.env.DB_NAME, // Database name
    password: process.env.DB_PASSWORD, // Database password
    port: process.env.DB_PORT, // Database port
});

// Test database connection
pool.connect()
    .then(() => console.log(" Connected to PostgreSQL Database"))
    .catch(err => console.error(" Database Connection Error:", err));

// Helper function to run queries
export const query = (text, params) => pool.query(text, params);

export default pool;
