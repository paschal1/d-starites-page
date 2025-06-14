import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import mongoose from 'mongoose'; //  Needed to convert messageId
import { Reply } from '@/models/Reply';
import dbConnect from '@/lib/db';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { to, subject, message, messageId } = await req.json();

    if (!to || !message || !messageId) {
      return NextResponse.json(
        { error: 'Missing required fields (to, message, messageId)' },
        { status: 400 }
      );
    }

    const emailResponse = await resend.emails.send({
      from: process.env.RESEND_FROM || 'onboarding@resend.dev',
      to,
      subject: subject || 'Reply to your message',
      html: `<p>${message}</p>`,
    });

    // Ensure messageId is saved as ObjectId
    const savedReply = new Reply({
      to,
      subject: subject || 'Reply to your message',
      message,
      messageId: new mongoose.Types.ObjectId(messageId),
    });

    await savedReply.save();

    return NextResponse.json({ status: 'sent', data: emailResponse });
  } catch (error) {
    console.error('[REPLY ERROR]', error);
    return NextResponse.json({ error: 'Failed to send reply' }, { status: 500 });
  }
}
