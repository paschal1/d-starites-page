// app/api/projects/route.ts
import { Project } from '@/models/Project';
import dbConnect from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  const projects = await Project.find({ published: true }).sort({ createdAt: -1 });
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();

  const project = await Project.create(data);
  return NextResponse.json(project);
}
