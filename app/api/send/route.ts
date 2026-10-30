import { NextResponse } from "next/server";
import {
  asString,
  escapeHtml,
  getEmailFrom,
  getNotificationEmail,
  getResend,
  isValidEmail,
} from "@/lib/email";

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (asString(body.website)) {
    return NextResponse.json({ success: true });
  }

  const name = asString(body.name);
  const email = asString(body.email);
  const subject = asString(body.subject) || "General enquiry";
  const message = asString(body.message);

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }

  if (!isValidEmail(email) || email.length > 160) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (subject.length > 120) {
    return NextResponse.json({ error: "Please choose a shorter subject." }, { status: 400 });
  }

  if (message.length < 10 || message.length > 4000) {
    return NextResponse.json(
      { error: "Your message should be between 10 and 4,000 characters." },
      { status: 400 },
    );
  }

  const resend = getResend();
  if (!resend) {
    console.warn(`[contact] RESEND_API_KEY is not set — message from ${email} was not emailed.`);
    return NextResponse.json({ success: true, demo: true });
  }

  try {
    const { error } = await resend.emails.send({
      from: getEmailFrom(),
      to: [getNotificationEmail()],
      replyTo: email,
      subject: `Contact — ${subject}`,
      html: `
        <!doctype html>
        <html lang="en">
          <body style="margin:0;background:#f6f4ef;font-family:Arial,Helvetica,sans-serif;color:#131313;">
            <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
              <div style="background:#131313;color:#fff;padding:24px 28px;border-radius:18px 18px 0 0;">
                <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#a8a39a;">Haven Streetwear</p>
                <h1 style="margin:8px 0 0;font-size:24px;">New contact message</h1>
              </div>
              <div style="background:#fff;padding:28px;border:1px solid #e0dbd2;border-top:0;border-radius:0 0 18px 18px;">
                <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#6b665d;">From</p>
                <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#131313;">
                  ${escapeHtml(name)}<br />
                  <a href="mailto:${escapeHtml(email)}" style="color:#131313;">${escapeHtml(email)}</a>
                </p>
                <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#6b665d;">Subject</p>
                <p style="margin:0 0 16px;font-size:14px;color:#131313;">${escapeHtml(subject)}</p>
                <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#6b665d;">Message</p>
                <p style="margin:0;font-size:14px;line-height:1.7;color:#131313;white-space:pre-wrap;">${escapeHtml(message)}</p>
              </div>
            </div>
          </body>
        </html>`,
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return NextResponse.json(
        { error: "We could not send your message. Please try again or email us directly." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[contact] Unexpected error", error);
    return NextResponse.json(
      { error: "We could not send your message. Please try again or email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
