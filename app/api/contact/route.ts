import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Contact } from '@/models/Contact';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  await dbConnect(); // Ensure DB is connected

  const body = await req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const currentYear = new Date().getFullYear();
  const companyName = 'D-Starite Technologies';
  const companyAddress = 'No 40 Alogwu Road, Port Harcourt, Nigeria';
  const logoUrl = 'https://i.imgur.com/4CA3YuG.jpeg';

 const adminHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 24px; border-radius: 8px;">
    <div style="text-align: center;">
      <img src="${logoUrl}" alt="${companyName} Logo" style="width: 140px; margin-bottom: 20px;" />
      <h2 style="color: #0f5132; font-size: 22px;">New Contact Submission</h2>
    </div>

    <div style="margin-top: 20px; font-size: 16px; color: #333; line-height: 1.6;">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br>${message}</p>
    </div>

    <hr style="margin: 40px 0;" />

    <footer style="text-align: center; font-size: 13px; color: #777;">
      <p>&copy; ${currentYear} ${companyName}. All rights reserved.</p>
      <p style="margin-top: 4px;">${companyAddress}</p>
    </footer>
  </div>
`;


const userHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 24px; border-radius: 8px;">
    <div style="text-align: center;">
      <img src="${logoUrl}" alt="${companyName} Logo" style="width: 140px; margin-bottom: 20px;" />
      <h2 style="color: #0f5132; font-size: 22px; margin-bottom: 10px;">Thank You, ${name}!</h2>
    </div>

    <p style="font-size: 16px; color: #333; line-height: 1.6;">
      We appreciate you reaching out to <strong>${companyName}</strong>. Your message has been received, and one of our team members will get back to you as soon as possible.
    </p>

    <div style="margin: 30px 0; text-align: center;">
      <a href="https://d-starites-page.vercel.app/contact" style="background-color: #0f5132; color: #fff; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-weight: bold;">
        Visit Our Website
      </a>
    </div>

    <p style="font-size: 15px; color: #555;">In the meantime, feel free to explore more about our services or check out our latest updates.</p>

    <hr style="margin: 40px 0;" />

    <footer style="text-align: center; font-size: 13px; color: #777;">
      <p>&copy; ${currentYear} ${companyName}. All rights reserved.</p>
      <p style="margin-top: 4px;">${companyAddress}</p>
    </footer>
  </div>
`;


  try {
    // Save contact in database
    await Contact.create({ name, email, message });

    // Send email to admin
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.ADMIN_EMAIL!,
      subject: `New contact request from ${name}`,
      html: adminHtml,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: email,
      subject: `Thanks for contacting ${companyName}`,
      html: userHtml,
    });

    return NextResponse.json({ message: 'Emails sent successfully' });
  } catch (err) {
    console.error('Email sending failed:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();

  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (err) {
    console.error('Failed to fetch messages:', err);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
