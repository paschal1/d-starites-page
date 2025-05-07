import { Schema, model, models, Document, Model } from 'mongoose';

export interface IAbout {

  title: string;
  content: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAboutDocument extends IAbout, Document {}

const AboutSchema = new Schema<IAboutDocument>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export const About: Model<IAboutDocument> =
  models.About || model<IAboutDocument>('About', AboutSchema);
