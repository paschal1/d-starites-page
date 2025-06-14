import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Team } from '@/models/Team';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const body = await req.json();
  const updated = await Team.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  await Team.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deleted' });
}
