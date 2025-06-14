import dbConnect from '@/lib/db';
import { Hero } from '@/models/Hero';
import { NextRequest, NextResponse } from 'next/server';

// GET Hero by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const hero = await Hero.findById(params.id);
    if (!hero) return NextResponse.json({ message: 'Hero not found' }, { status: 404 });
    return NextResponse.json(hero, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching hero' }, { status: 500 });
  }
}

// PUT (Update Hero)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const heroData = await req.json();
    const updatedHero = await Hero.findByIdAndUpdate(params.id, heroData, { new: true });
    if (!updatedHero) return NextResponse.json({ message: 'Hero not found' }, { status: 404 });
    return NextResponse.json(updatedHero, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating hero' }, { status: 500 });
  }
}

// DELETE Hero
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    await Hero.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Hero deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting hero' }, { status: 500 });
  }
}
