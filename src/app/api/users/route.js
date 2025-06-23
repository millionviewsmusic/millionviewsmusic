import { NextResponse } from "next/server";
import db from "../../database/db.js";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const offset = (page - 1) * limit;

    // Get total count of users (excluding admins)
    const countResult = await db.query(
      "SELECT COUNT(*) FROM users WHERE role != 'admin'"
    );
    const total = parseInt(countResult.rows[0].count);

    // Get paginated users
    const usersResult = await db.query(
      "SELECT email FROM users WHERE role != 'admin' ORDER BY id ASC LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    return NextResponse.json({
      users: usersResult.rows,
      total,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const result = await db.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    const user = result.rows[0];

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
