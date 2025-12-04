import pkg from 'pg';
import 'dotenv/config'; 

const { Pool } = pkg;

// Use the DATABASE_URL environment variable from Render/Supabase
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Add SSL requirement for security, common with cloud databases like Supabase
  ssl: {
    rejectUnauthorized: false 
    // Supabase usually provides self-signed certs or requires this setting
  }
});

// Optional: Test the connection when the module loads
pool.connect()
  .then(() => console.log("Database pool connected successfully!"))
  .catch(err => console.error("Failed to connect to database:", err.stack));

// Export the pool so other files can use it to run queries
export default pool;