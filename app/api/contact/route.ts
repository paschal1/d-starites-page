import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Contact } from '@/models/Contact'; // create this model if it doesn't exist yet

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  await dbConnect(); // ensure DB is connected

  const body = await req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    // Save to DB
    await Contact.create({ name, email, message });

    // Send to admin
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.ADMIN_EMAIL!,
      subject: `New contact request from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    });

    // Send confirmation to user
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: email,
      subject: `Thanks for contacting D-Starite Technologies`,
      html: `<p>Hi ${name},</p><p>Thanks for reaching out. We’ve received your message and will get back to you soon.</p>`,
    });

    return NextResponse.json({ message: 'Emails sent successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();

  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
