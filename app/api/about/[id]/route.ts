import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { About } from '@/models/About';

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await dbConnect();
  const { id } = context.params;
  const data = await req.json();
  const updated = await About.findByIdAndUpdate(id, data, { new: true });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await dbConnect();
  const { id } = context.params;
  await About.findByIdAndDelete(id);

  return NextResponse.json({ message: 'Deleted successfully' });
}
