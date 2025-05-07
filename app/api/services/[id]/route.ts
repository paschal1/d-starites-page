import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Service } from '@/models/Service';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    await dbConnect();
    const updatedService = await Service.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(updatedService);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    await Service.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete service" }, { status: 500 });
  }
}
