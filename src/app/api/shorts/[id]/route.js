import { NextResponse } from "next/server";
import db from "../../../database/db.js";

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const { videoId, title, createdAt } = data;

    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Missing short ID" }, { status: 400 });
    }
    if (!videoId || !title || !createdAt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await db.query(
      `
      UPDATE shorts
      SET "videoId" = $1, title = $2, "createdAt" = $3
      WHERE id = $4
      RETURNING *
      `,
      [videoId, title, createdAt, id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Short not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Short updated successfully" });
  } catch (err) {
    console.error("Error updating short:", err);
    return NextResponse.json(
      { error: "Failed to update short" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Missing short ID" }, { status: 400 });
    }

    const result = await db.query(`DELETE FROM shorts WHERE "videoId" = $1`, [
      id,
    ]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Short not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Short deleted successfully" });
  } catch (err) {
    console.error("Error deleting short:", err);
    return NextResponse.json(
      { error: "Failed to delete short" },
      { status: 500 }
    );
  }
}
