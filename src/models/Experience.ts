import { Schema, model } from 'mongoose';

const experienceSchema = new Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    highlights: [{ type: String, required: true }]
  },
  { timestamps: true }
);

export const Experience = model('Experience', experienceSchema);
