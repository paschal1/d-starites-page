import { Schema, model, models, Document, Model } from 'mongoose';

export interface ITeam {
  name: string;
  role: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITeamDocument extends ITeam, Document {}

const TeamSchema = new Schema<ITeamDocument>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export const Team: Model<ITeamDocument> = models.Team || model<ITeamDocument>('Team', TeamSchema);
