import { Schema, model } from 'mongoose';

const skillSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, required: true }
  },
  { timestamps: true }
);

export const Skill = model('Skill', skillSchema);
