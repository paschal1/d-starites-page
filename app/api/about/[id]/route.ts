import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { About } from "@/models/About";

interface Context {
  params: {
    id: string;
  };
}

export async function PUT(req: Request, context: Context) {
  try {
    const data = await req.json();
    await dbConnect();
    const updatedAbout = await About.findByIdAndUpdate(context.params.id, data, { new: true });
    return NextResponse.json(updatedAbout);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update about" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: Context) {
  try {
    await dbConnect();
    await About.findByIdAndDelete(context.params.id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete about" }, { status: 500 });
  }
}
