// server/server.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

/*
  IMPORTANT: replace these with your real credentials.
  If using Gmail: enable 2FA and create an App Password, then use it here.
*/
const EMAIL_FROM = "yourgmail@gmail.com";
const EMAIL_PASS = "your-app-password";

// create transporter (Gmail example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: EMAIL_FROM, pass: EMAIL_PASS },
});

// In-memory code storage (development only)
const codes = {};

// Health check
app.get("/health", (req, res) => res.json({ ok: true }));

// Send verification code
app.post("/auth/send-code", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ ok: false, error: "missing_email" });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  codes[email] = code; // store code (volatile)

  try {
    await transporter.sendMail({
      from: `"LeadScore Lite" <${EMAIL_FROM}>`,
      to: email,
      subject: "Your LeadScore verification code",
      text: `Your verification code is: ${code}`,
    });
    console.log(`Sent code ${code} -> ${email}`);
    return res.json({ ok: true, message: "Verification code sent." });
  } catch (err) {
    console.error("Mail error:", err);
    return res.status(500).json({ ok: false, error: "email_failed" });
  }
});

// Verify code
app.post("/auth/verify-code", (req, res) => {
  const { email, code } = req.body;
  if (codes[email] && codes[email] === code) {
    delete codes[email];
    return res.json({ ok: true, token: "mock-jwt-token" });
  }
  return res.status(400).json({ ok: false, error: "invalid_code" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
