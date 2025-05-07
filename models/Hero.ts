import { Schema, model, models, Document, Model } from 'mongoose';

export interface IHero {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IHeroDocument extends IHero, Document {}

const HeroSchema = new Schema<IHeroDocument>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    buttonText: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true } // This should be passed as a second argument after the schema definition
);

// Only define the model if it hasn't been defined yet
export const Hero: Model<IHeroDocument> = models.Hero || model<IHeroDocument>('Hero', HeroSchema);
