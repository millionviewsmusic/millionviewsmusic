import { NextResponse } from "next/server";
import db from "../../database/db.js";

export async function GET() {
  try {
    const result = await db.query("SELECT * FROM shorts");
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("Error fetching shorts:", err);
    return NextResponse.json(
      { error: "Failed to fetch shorts" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { videoId, title, createdAt } = body;

    if (!videoId || !title || !createdAt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await db.query(
      `
      INSERT INTO shorts ("videoId", title, "createdAt")
      VALUES ($1, $2, $3)
      `,
      [videoId, title, createdAt]
    );

    return NextResponse.json(
      { message: "Short added successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error adding short:", err);
    return NextResponse.json({ error: "Failed to add short" }, { status: 500 });
  }
}
