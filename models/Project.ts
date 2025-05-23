import { Schema, model, models, Document, Model } from 'mongoose';

export interface IProject {
  title: string;
  description: string;
  imageUrl: string;
  published?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProjectDocument extends IProject, Document {}

const ProjectSchema = new Schema<IProjectDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Project: Model<IProjectDocument> =
  models.Project || model<IProjectDocument>('Project', ProjectSchema);
