import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { About } from '@/models/About';

type Params = {
  params: {
    id: string;
  };
};

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const data = await req.json();

    const updatedAbout = await About.findByIdAndUpdate(params.id, data, { new: true });

    return NextResponse.json(updatedAbout);
  } catch (error) {
    console.error('PATCH /api/about/[id] failed:', error);
    return NextResponse.json({ message: 'Failed to update about' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await dbConnect();

    await About.findByIdAndDelete(params.id);

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/about/[id] failed:', error);
    return NextResponse.json({ message: 'Failed to delete about' }, { status: 500 });
  }
}
