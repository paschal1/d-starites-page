import { Blog } from '@/models/Blog';
import dbConnect from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(_req: NextRequest, context: { params: { id: string } }) {
  await dbConnect();

  const { id } = context.params;

  // ✅ Validate the ID before querying MongoDB
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid blog ID' }, { status: 400 });
  }

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  await dbConnect();

  const { id } = context.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid blog ID' }, { status: 400 });
  }

  const data = await req.json();
  const updated = await Blog.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, context: { params: { id: string } }) {
  await dbConnect();

  const { id } = context.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid blog ID' }, { status: 400 });
  }

  await Blog.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deleted successfully' });
}
