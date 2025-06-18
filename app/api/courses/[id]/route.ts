import { Course } from '@/models/Course';
import dbConnect from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });

  const course = await Course.findById(id);
  if (!course) return NextResponse.json({ message: 'Course not found' }, { status: 404 });

  return NextResponse.json(course);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const data = await req.json();
  const course = await Course.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(course);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  await Course.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deleted successfully' });
}
