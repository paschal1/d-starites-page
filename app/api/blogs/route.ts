import { Blog } from '@/models/Blog';
import dbConnect from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  const blogs = await Blog.find().sort({ createdAt: -1 });
  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const newBlog = await Blog.create(body);
  return NextResponse.json(newBlog);
}
