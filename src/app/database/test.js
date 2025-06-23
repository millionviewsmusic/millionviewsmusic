import { Client } from "pg";
import fs from "fs";

// Replace with your Neon connection string
const connectionString =
  "postgresql://neondb_owner:npg_YfVb5lAM9Cju@ep-orange-heart-a83hzddx-pooler.eastus2.azure.neon.tech/neondb?sslmode=require";

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false }, // Required for Neon
});

async function fetchAllTables() {
  try {
    await client.connect();

    const tables = ["videos", "shorts", "playlists", "users"];
    const data = {};

    for (const table of tables) {
      const res = await client.query(`SELECT * FROM ${table}`);
      data[table] = res.rows;
      console.log(`Fetched ${res.rowCount} rows from "${table}"`);
    }

    const output = `module.exports = ${JSON.stringify(data, null, 2)};\n`;

    fs.writeFileSync("data.js", output, "utf8");
    console.log("\n✅ Data written to data.js");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.end();
  }
}

fetchAllTables();
