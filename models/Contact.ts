import { Schema, model, models, Document, Model } from 'mongoose';

export interface IContact {
  name: string;
  email: string;
  message: string;
  createdAt?: Date;
}

export interface IContactDocument extends IContact, Document {}

const ContactSchema = new Schema<IContactDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const Contact: Model<IContactDocument> =
  models.Contact || model<IContactDocument>('Contact', ContactSchema);
