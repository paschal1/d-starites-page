import { Schema, model, Document, Model } from 'mongoose';

// 1. Define interface for your data
export interface IHero {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
}

// 2. Create a document interface that extends both IHero and Mongoose's Document
export interface IHeroDocument extends IHero, Document {}

// 3. Define your schema (no need for generics unless strictly needed)
const HeroSchema = new Schema<IHeroDocument>({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  buttonText: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

// 4. Model type: model<IHeroDocument> is sufficient
export const Hero: Model<IHeroDocument> = model<IHeroDocument>('Hero', HeroSchema);
