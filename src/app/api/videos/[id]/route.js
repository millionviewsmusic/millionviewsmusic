import { NextResponse } from "next/server";
import db from "../../../database/db.js";

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const {
      videoId,
      title,
      createdAt,
      youtubeLink,
      spotifyLink,
      amazonLink,
      appleMusicLink,
      gaanaLink,
    } = data;

    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Missing video ID" }, { status: 400 });
    }

    if (!videoId || !title || !createdAt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await db.query(
      `
      UPDATE videos
      SET "videoId" = $1,
          title = $2,
          "createdAt" = $3,
          "youtubeLink" = $4,
          "spotifyLink" = $5,
          "amazonLink" = $6,
          "appleMusicLink" = $7,
          "gaanaLink" = $8
      WHERE id = $9
      `,
      [
        videoId,
        title,
        createdAt,
        youtubeLink || null,
        spotifyLink || null,
        amazonLink || null,
        appleMusicLink || null,
        gaanaLink || null,
        id,
      ]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Video updated successfully" });
  } catch (err) {
    console.error("Error updating video:", err);
    return NextResponse.json(
      { error: "Failed to update video" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Missing video ID" }, { status: 400 });
    }

    const result = await db.query(`DELETE FROM videos WHERE "videoId" = $1`, [
      id,
    ]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Video deleted successfully" });
  } catch (err) {
    console.error("Error deleting video:", err);
    return NextResponse.json(
      { error: "Failed to delete video" },
      { status: 500 }
    );
  }
}
