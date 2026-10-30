import { NextResponse } from "next/server";
import {
  asString,
  getEmailFrom,
  getNotificationEmail,
  getResend,
  isValidEmail,
} from "@/lib/email";

export async function POST(request: Request) {
  let body: { email?: unknown };

  try {
    body = (await request.json()) as { email?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = asString(body.email);
  if (!isValidEmail(email) || email.length > 160) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const resend = getResend();
  if (!resend) {
    console.warn(`[newsletter] RESEND_API_KEY is not set — skipping signup for ${email}.`);
    return NextResponse.json({ success: true, demo: true });
  }

  try {
    const { error } = await resend.emails.send({
      from: getEmailFrom(),
      to: [getNotificationEmail()],
      replyTo: email,
      subject: "New newsletter subscriber",
      text: `New Haven newsletter subscriber: ${email}`,
    });

    if (error) {
      console.error("[newsletter] Resend error", error);
      return NextResponse.json(
        { error: "We could not add you to the list. Please try again." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[newsletter] Unexpected error", error);
    return NextResponse.json(
      { error: "We could not add you to the list. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
