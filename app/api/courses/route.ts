import { Course } from '@/models/Course';
import dbConnect from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  const courses = await Course.find().sort({ createdAt: -1 });
  return NextResponse.json(courses);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  const course = await Course.create(data);
  return NextResponse.json(course, { status: 201 });
}
