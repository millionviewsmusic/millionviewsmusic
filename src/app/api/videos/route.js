import { NextResponse } from "next/server";
import db from "../../database/db";

export async function GET(req) {
  try {
    const result = await db.query("SELECT * FROM videos");

    console.log(" data from backend ", result.rows);
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("Error fetching videos:", err);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      videoId,
      title,
      createdAt,
      youtubeLink = null,
      spotifyLink = null,
      amazonLink = null,
      appleMusicLink = null,
      gaanaLink = null,
    } = body;

    if (!videoId || !title || !createdAt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await db.query(
      `
      INSERT INTO videos 
        ("videoId", title, "createdAt", "youtubeLink", "spotifyLink", "amazonLink", "appleMusicLink", "gaanaLink")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [
        videoId,
        title,
        createdAt,
        youtubeLink,
        spotifyLink,
        amazonLink,
        appleMusicLink,
        gaanaLink,
      ]
    );

    return NextResponse.json(
      { message: "Video added successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error adding video:", err);
    return NextResponse.json({ error: "Failed to add video" }, { status: 500 });
  }
}
