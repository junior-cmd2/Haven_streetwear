import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();

  const { email, name, message } = body;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: ["junioragbasi@gmail.com"],
    subject: "New Contact Message",
    html: 
      `
        <h1>New Contact Message</h1>
        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Name:</strong> ${name || "Not provided"}</p>

        <p><strong>Message:</strong></p>
        <p>${message || "Not provided"}</p>
      `,
  });

  if (error) {
    return Response.json(
      { error: error.message },
      { status: 400 }
    );
  }

  return Response.json({
    success: true,
    data,
  });
}