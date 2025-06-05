// // dropTables.js
// import db from "./db.js";

// const dropTables = async () => {
//   try {
//     await db.query(`DROP TABLE IF EXISTS videos;`);
//     await db.query(`DROP TABLE IF EXISTS shorts;`);
//     await db.query(`DROP TABLE IF EXISTS playlists;`);
//     await db.query(`DROP TABLE IF EXISTS users;`);

//     console.log("✅ All tables dropped successfully.");
//   } catch (err) {
//     console.error("❌ Error dropping tables:", err);
//   } finally {
//     db.end(); // Close the DB connection
//   }
// };

// dropTables();
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
