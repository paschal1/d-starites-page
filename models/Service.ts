import { Schema, model, models, Document, Model } from 'mongoose';

export interface IService {
  title: string;
  description: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IServiceDocument extends IService, Document {}

const ServiceSchema = new Schema<IServiceDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export const Service: Model<IServiceDocument> =
  models.Service || model<IServiceDocument>('Service', ServiceSchema);
