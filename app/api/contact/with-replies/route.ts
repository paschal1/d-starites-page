import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Contact } from '@/models/Contact';
import { Reply } from '@/models/Reply';

export async function GET() {
  await dbConnect();

  // Get all contacts
  const contacts = await Contact.find().sort({ createdAt: -1 }).lean();

  // For each contact, get replies
  const messagesWithReplies = await Promise.all(
    contacts.map(async (msg) => {
      const replies = await Reply.find({ to: msg.email }).sort({ createdAt: 1 }).lean();
      return {
        ...msg,
        replies,
      };
    })
  );

  return NextResponse.json(messagesWithReplies);
}
