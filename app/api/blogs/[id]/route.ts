// app/api/blogs/[id]/route.ts
import { Blog } from '@/models/Blog';
import dbConnect from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  params: {
    id: string;
  };
};

// GET single blog by ID
export async function GET(_req: NextRequest, { params }: Params) {
  await dbConnect();
  const blog = await Blog.findById(params.id);

  if (!blog) {
    return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
  }

  return NextResponse.json(blog);
}

// PATCH blog by ID
export async function PATCH(req: NextRequest, { params }: Params) {
  await dbConnect();
  const data = await req.json();
  const updated = await Blog.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

// DELETE blog by ID
export async function DELETE(_req: NextRequest, { params }: Params) {
  await dbConnect();
  await Blog.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deleted successfully' });
}
