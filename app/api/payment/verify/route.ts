// app/api/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Payment, IPaymentDocument } from '@/models/Payment';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    const { name, email, amount, courseId, reference, status } = body;

    if (!name || !email || !amount || !courseId || !reference) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
    }

    const payment: IPaymentDocument = await Payment.create({
      name,
      email,
      amount,
      courseId,
      reference,
      status: status || 'success',
    });

    return NextResponse.json({ success: true, payment }, { status: 201 });
  } catch (error) {
    console.error('Error saving payment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save payment' },
      { status: 500 }
    );
  }
}
