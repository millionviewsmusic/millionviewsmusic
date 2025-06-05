import nodemailer from "nodemailer";
import db from "../../database/db.js";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME || "millionviewsmusic1@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "",
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "millionviewsmusic1@gmail.com",
      subject: "New Contact Message",
      text: message,
    });

    // Check if user already exists
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const existingUser = checkResult.rows[0];

    // If not exists, insert as 'user'
    if (!existingUser) {
      await db.query("INSERT INTO users (email, role) VALUES ($1, $2)", [
        email,
        "user",
      ]);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
