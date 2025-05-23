import dbConnect from '@/lib/db';
import { About } from '@/models/About';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  await dbConnect(); // <== This was missing `()`
  const { id } = context.params;
  const body = await req.json();
  const updated = await About.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  await dbConnect();
  const { id } = context.params;
  await About.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deleted successfully' });
}
