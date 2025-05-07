import  dbConnect  from '@/lib/db';
import { About } from '@/models/About';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  const latestAbout = await About.findOne().sort({ createdAt: -1 });
  return NextResponse.json(latestAbout);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const about = await About.create(body);
  return NextResponse.json(about);
}
