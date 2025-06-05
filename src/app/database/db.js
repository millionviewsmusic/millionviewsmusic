// db.js
import pkg from "pg";
const { Pool } = pkg;

const db = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_YfVb5lAM9Cju@ep-orange-heart-a83hzddx-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
  ssl: {
    rejectUnauthorized: false, // Neon requires SSL
  },
});

export default db;
