import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Hero, IHeroDocument } from '@/models/Hero';

// GET Method: Fetch the latest hero section (single one)
export async function GET() {
  try {
    await dbConnect();

    // Fetch only the most recently created hero
    const latestHero: IHeroDocument | null = await Hero.findOne().sort({ createdAt: -1 }).exec();

    if (!latestHero) {
      return NextResponse.json({ message: "No hero section found" }, { status: 404 });
    }

    return NextResponse.json([latestHero]); // Wrap the single hero in an array
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch hero section" }, { status: 500 });
  }
}

// POST Method: Create or update a hero section
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
