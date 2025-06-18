// app/api/contact/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Contact } from '@/models/Contact';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  await dbConnect();

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
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px;">
      <div style="text-align: center;">
        <img src="${logoUrl}" alt="${companyName} Logo" style="width: 140px; margin-bottom: 20px;" />
        <h2 style="color: #0f5132;">New Contact Message</h2>
      </div>
      <div style="text-align: left; margin-top: 20px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      </div>
      <hr style="margin: 40px 0;" />
      <footer style="text-align: center; font-size: 13px; color: #777;">
        <p>&copy; ${currentYear} ${companyName}. All rights reserved.</p>
        <p>${companyAddress}</p>
      </footer>
    </div>
  `;

  const userHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #ddd; border-radius: 8px;">
      <div style="text-align: center;">
        <img src="${logoUrl}" alt="${companyName} Logo" style="width: 140px; margin-bottom: 20px;" />
        <h2 style="color: #0f5132;">Thank You, ${name}!</h2>
      </div>
      <p style="font-size: 16px; color: #333;">Thanks for contacting <strong>${companyName}</strong>. Your message has been received. We’ll respond shortly.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://d-starites-page.vercel.app/contact" style="background-color: #0f5132; color: #fff; padding: 12px 24px; border-radius: 5px; text-decoration: none;">
          Visit Our Website
        </a>
      </div>
      <p style="font-size: 14px; color: #666;">Feel free to explore our services while you wait.</p>
      <hr style="margin: 40px 0;" />
      <footer style="text-align: center; font-size: 13px; color: #777;">
        <p>&copy; ${currentYear} ${companyName}. All rights reserved.</p>
        <p>${companyAddress}</p>
      </footer>
    </div>
  `;

  try {
    await Contact.create({ name, email, message });

    // Send to admin
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.ADMIN_EMAIL!,
      subject: `New contact request from ${name}`,
      html: adminHtml,
    });

    // Send to user — this version keeps it stable like your old one
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: email,
      subject: `Thanks for contacting ${companyName}`,
      html: userHtml,
    });

    return NextResponse.json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 });
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
