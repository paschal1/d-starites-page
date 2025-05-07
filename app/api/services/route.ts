import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Service, IServiceDocument } from "@/models/Service";

export async function GET() {
  try {
    await dbConnect();

    const services: IServiceDocument[] = await Service.find().exec();

    if (!services.length) {
      return NextResponse.json({ message: "No services found" }, { status: 404 });
    }

    return NextResponse.json(services);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await dbConnect();

    const service = await Service.create(data);

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create service" }, { status: 500 });
  }
}
