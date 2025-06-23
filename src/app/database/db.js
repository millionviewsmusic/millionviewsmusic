// db.js
import pkg from "pg";
const { Pool } = pkg;

const db = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres.gfkdqabsefrxjmnhzaqu:Sairam@1437@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
  ssl: {
    rejectUnauthorized: false, // Neon requires SSL
  },
});

export default db;
