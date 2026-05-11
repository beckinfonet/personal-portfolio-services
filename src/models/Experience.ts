import { Schema, model } from 'mongoose';

const experienceSchema = new Schema(
  {
    company: { type: String, required: true },
    role:    { type: String, required: true },
    period:  { type: String, required: true },
    summary: { type: String, required: true }
  },
  { timestamps: true, strict: 'throw' }
);

// Composite index — same company in different periods is allowed (different roles).
experienceSchema.index({ company: 1, period: 1 }, { unique: true });

export const Experience = model('Experience', experienceSchema);
