import { NextResponse } from "next/server";
import db from "../../../database/db.js";

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const { videoId, firstVideoId, title, createdAt } = data;

    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: "Missing Playlist ID" },
        { status: 400 }
      );
    }
    if (!videoId || !title || !createdAt || !firstVideoId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await db.query(
      `
      UPDATE playlists
      SET "videoId" = $1, "firstVideoId" = $2, title = $3, "createdAt" = $4
      WHERE id = $5
      `,
      [videoId, firstVideoId, title, createdAt, id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Playlist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Playlist updated successfully" });
  } catch (err) {
    console.error("Error updating playlist:", err);
    return NextResponse.json(
      { error: "Failed to update playlist" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing playlist ID" },
        { status: 400 }
      );
    }

    const result = await db.query(
      `DELETE FROM playlists WHERE "videoId" = $1`,
      [id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "playlist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "playlist deleted successfully" });
  } catch (err) {
    console.error("Error deleting playlist:", err);
    return NextResponse.json(
      { error: "Failed to delete playlist" },
      { status: 500 }
    );
  }
}
