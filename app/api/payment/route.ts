// app/api/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Payment } from '@/models/Payment';

export async function GET() {
  try {
    await dbConnect();
    const payments = await Payment.find().sort({ createdAt: -1 });
    return NextResponse.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch payments' }, { status: 500 });
  }
}
