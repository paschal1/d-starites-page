import { Schema, model, models, Document, Model } from 'mongoose';

export interface IBlog {
  title: string;
  excerpt: string;
  image: string;
  author: string;
  slug: string;
  date: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Document version of the blog interface
export interface IBlogDocument extends IBlog, Document {}

// Define the schema
const BlogSchema = new Schema<IBlogDocument>(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

// Define and export the model with proper typing
export const Blog: Model<IBlogDocument> =
  models.Blog || model<IBlogDocument>('Blog', BlogSchema);
