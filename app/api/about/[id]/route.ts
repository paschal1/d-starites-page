import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { About } from "@/models/About";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    await dbConnect();
    const updatedAbout = await About.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(updatedAbout);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update about" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    await About.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete about" }, { status: 500 });
  }
}
