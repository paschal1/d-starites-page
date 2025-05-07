import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Hero, IHeroDocument } from '@/models/Hero';

export async function GET() {
  try {
    await dbConnect();

    // Find the first hero document in the collection
    const hero: IHeroDocument | null = await Hero.findOne({}).exec();

    if (!hero) {
      return NextResponse.json({ message: "Hero not found" }, { status: 404 });
    }

    return NextResponse.json(hero);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch hero section" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await dbConnect();

    // Update the hero document, or insert one if it doesn't exist
    const updated: IHeroDocument = await Hero.findOneAndUpdate({}, data, {
      upsert: true, // Create the document if it doesn't exist
      new: true,    // Return the updated document
    }).exec();

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update hero section" }, { status: 500 });
  }
}
