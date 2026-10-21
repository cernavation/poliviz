import { NextRequest, NextResponse } from "next/server";
import { SITE } from "../../../../content/site.config";

/**
 * POST /raschet/api
 * Receives order form submission.
 * Currently logs to console + returns success.
 * Email sending is controlled by env variables:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO
 * If env vars are absent, the request is still accepted and logged.
 */
export async function POST(req: NextRequest) {
  // Honeypot check
  const data = await req.formData();
  const hp = data.get("_hp");
  if (hp && String(hp).length > 0) {
    // Bot detected — return 200 to not tip them off
    return NextResponse.json({ ok: true });
  }

  const name     = String(data.get("name") ?? "").trim();
  const phone    = String(data.get("phone") ?? "").trim();
  const email    = String(data.get("email") ?? "").trim();
  const product  = String(data.get("product") ?? "").trim();
  const quantity = String(data.get("quantity") ?? "").trim();
  const deadline = String(data.get("deadline") ?? "").trim();
  const comment  = String(data.get("comment") ?? "").trim();

  // Basic server-side validation
  if (!name || !phone) {
    return NextResponse.json({ error: "name and phone are required" }, { status: 400 });
  }

  const payload = { name, phone, email, product, quantity, deadline, comment };

  // Log to console (always)
  console.info("[order] New order submission:", payload);

  // Send email if SMTP env vars are present
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const mailTo   = process.env.MAIL_TO ?? SITE.email;

  if (smtpHost && smtpUser && smtpPass) {
    // TODO: wire up nodemailer or @sendgrid/mail here
    // Example with nodemailer (install separately):
    // const nodemailer = await import("nodemailer");
    // const transporter = nodemailer.createTransport({ host: smtpHost, ... });
    // await transporter.sendMail({ to: mailTo, subject: "Новый заказ", text: ... });
    console.info("[order] SMTP configured — email adapter not yet wired. Mail would go to:", mailTo);
  } else {
    console.info("[order] No SMTP env vars — email not sent. Set SMTP_HOST, SMTP_USER, SMTP_PASS, MAIL_TO.");
  }

  return NextResponse.json({ ok: true });
}

// Only POST is handled
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
