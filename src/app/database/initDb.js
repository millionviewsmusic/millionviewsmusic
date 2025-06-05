// initDb.js
import db from "./db.js";

const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS videos (
        id SERIAL PRIMARY KEY,
        "videoId" TEXT NOT NULL,
        title TEXT NOT NULL,
        "createdAt" TEXT NOT NULL,
        "youtubeLink" TEXT,
        "spotifyLink" TEXT,
        "amazonLink" TEXT,
        "appleMusicLink" TEXT,
        "gaanaLink" TEXT
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS shorts (
        id SERIAL PRIMARY KEY,
        "videoId" TEXT NOT NULL,
        title TEXT NOT NULL,
        "createdAt" TEXT NOT NULL
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS playlists (
        id SERIAL PRIMARY KEY,
        "videoId" TEXT NOT NULL,
        "firstVideoId" TEXT NOT NULL,
        title TEXT NOT NULL,
        "createdAt" TEXT NOT NULL
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT,
        role TEXT NOT NULL DEFAULT 'user'
      );
    `);

    console.log("✅ Tables created with camelCase columns");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  } finally {
    db.end();
  }
};

createTables();
