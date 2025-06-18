import { Schema, model, models, Document, Model } from 'mongoose';

export interface ICourse {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICourseDocument extends ICourse, Document {}

const CourseSchema = new Schema<ICourseDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Course: Model<ICourseDocument> =
  models.Course || model<ICourseDocument>('Course', CourseSchema);
