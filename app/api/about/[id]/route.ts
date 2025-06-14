import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { About } from "@/models/About";

// Update about by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    await dbConnect();

    const updatedAbout = await About.findByIdAndUpdate(params.id, data, { new: true });

    if (!updatedAbout) {
      return NextResponse.json({ message: "About not found" }, { status: 404 });
    }

    return NextResponse.json(updatedAbout);
  } catch (error) {
    console.error("Error updating About:", error);
    return NextResponse.json({ message: "Failed to update about" }, { status: 500 });
  }
}

// Delete about by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();

    const deleted = await About.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json({ message: "About not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting About:", error);
    return NextResponse.json({ message: "Failed to delete about" }, { status: 500 });
  }
}
