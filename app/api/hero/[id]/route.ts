import dbConnect from '@/lib/db';
import { Hero } from '@/models/Hero';
import { NextResponse } from 'next/server';

// Get Hero by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const hero = await Hero.findById(params.id);
    if (!hero) {
      return NextResponse.json({ message: 'Hero not found' }, { status: 404 });
    }
    return NextResponse.json(hero, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching hero' }, { status: 500 });
  }
}

// Edit Hero (Update)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const heroData = await req.json(); // Get the updated data from the request body
    const updatedHero = await Hero.findByIdAndUpdate(params.id, heroData, { new: true });

    if (!updatedHero) {
      return NextResponse.json({ message: 'Hero not found' }, { status: 404 });
    }

    return NextResponse.json(updatedHero, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating hero' }, { status: 500 });
  }
}

// Delete Hero
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    await Hero.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Hero deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting hero' }, { status: 500 });
  }
}
