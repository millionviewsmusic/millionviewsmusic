import db from "./db.js";

async function insertAdminUser() {
  try {
    await db.query(
      `
      INSERT INTO users (email, password, role)
      VALUES ($1, $2, $3)
      ON CONFLICT (email) DO NOTHING
      `,
      ["millionviewsmusic1@gmail.com", "Sairam@1437", "admin"]
    );
    console.log("Admin user inserted (or already exists)");
  } catch (err) {
    console.error("Error inserting admin user:", err);
  } finally {
    db.end();
  }
}

insertAdminUser();
