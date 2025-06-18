// models/Payment.ts
import { Schema, model, models, Document, Model } from 'mongoose';

export interface IPayment {
  name: string;
  email: string;
  amount: number;
  courseId: string;
  reference: string;
  status: 'pending' | 'success' | 'failed';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPaymentDocument extends IPayment, Document {}

const PaymentSchema = new Schema<IPaymentDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    courseId: { type: String, required: true },
    reference: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const Payment: Model<IPaymentDocument> =
  models.Payment || model<IPaymentDocument>('Payment', PaymentSchema);
