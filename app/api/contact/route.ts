import { NextRequest, NextResponse } from "next/server";

interface ContactBody {
  name: string;
  email: string;
  phone: string;
  area: string;
  subject: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: Partial<ContactBody>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const { name, email, phone, area, subject, message } = body;

  // Basic presence validation
  if (!name || !email || !phone || !area || !subject || !message) {
    return NextResponse.json(
      { ok: false, error: "All fields are required." },
      { status: 422 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email address." },
      { status: 422 }
    );
  }

  // TODO: Wire in an email provider here.
  // Example with Resend:
  //
  //   import { Resend } from "resend";
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "noreply@biofactor.in",
  //     to: "info@biofactor.in",
  //     subject: `New contact: ${subject}`,
  //     html: `<p><b>Name:</b> ${name}</p>
  //            <p><b>Email:</b> ${email}</p>
  //            <p><b>Phone:</b> ${phone}</p>
  //            <p><b>Area:</b> ${area}</p>
  //            <p><b>Subject:</b> ${subject}</p>
  //            <p><b>Message:</b> ${message}</p>`,
  //   });
  //
  // Example with Nodemailer (SMTP):
  //
  //   import nodemailer from "nodemailer";
  //   const transporter = nodemailer.createTransport({ ... });
  //   await transporter.sendMail({ from, to, subject, html });

  return NextResponse.json({ ok: true });
}
