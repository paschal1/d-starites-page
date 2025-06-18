// app/api/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Payment, IPaymentDocument } from '@/models/Payment';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json(); // contains name, email, amount, courseId, reference
    await dbConnect();

    const payment: IPaymentDocument = await Payment.create(data);

    return NextResponse.json({ success: true, payment }, { status: 201 });
  } catch (error) {
    console.error('Error saving payment:', error);
    return NextResponse.json({ success: false, error: 'Failed to save payment' }, { status: 500 });
  }
}
