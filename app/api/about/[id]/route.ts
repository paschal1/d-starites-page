import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { About } from '@/models/About';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const data = await req.json();
  const updated = await About.findByIdAndUpdate(params.id, data, { new: true });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  await About.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deleted successfully' });
}
