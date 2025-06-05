import { NextResponse } from "next/server";
import db from "../../database/db.js";

export async function GET() {
  try {
    const result = await db.query("SELECT * FROM playlists");
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("Error fetching playlists:", err);
    return NextResponse.json(
      { error: "Failed to fetch playlists" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { videoId, firstVideoId, title, createdAt } = body;

    if (!videoId || !title || !createdAt || !firstVideoId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await db.query(
      `
      INSERT INTO playlists ("videoId", "firstVideoId", title, "createdAt")
      VALUES ($1, $2, $3, $4)
      `,
      [videoId, firstVideoId, title, createdAt]
    );

    return NextResponse.json(
      { message: "Playlist added successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error adding playlist:", err);
    return NextResponse.json(
      { error: "Failed to add playlist" },
      { status: 500 }
    );
  }
}
