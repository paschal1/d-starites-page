import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Team } from '@/models/Team';

export async function GET() {
  await dbConnect();
  const members = await Team.find();
  return NextResponse.json(members);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const member = await Team.create(body);
  return NextResponse.json(member);
}
