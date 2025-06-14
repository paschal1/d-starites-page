import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { About } from "@/models/About";

// PUT: Update an about document
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await req.json();

    const updatedAbout = await About.findByIdAndUpdate(params.id, body, { new: true });

    if (!updatedAbout) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(updatedAbout);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update about" }, { status: 500 });
  }
}

// DELETE: Delete an about document
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();

    const deleted = await About.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete about" }, { status: 500 });
  }
}
