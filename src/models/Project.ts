import { Schema, model } from 'mongoose';

const projectSchema = new Schema(
  {
    name:    { type: String, required: true, unique: true },
    year:    { type: String, required: true },
    status:  { type: String, required: true },
    summary: { type: String, required: true },
    tech:    { type: [String], required: true, default: [] },
    role:    { type: String, required: true },
    link:    { type: String, required: true }
  },
  { timestamps: true, strict: 'throw' }
);

export const Project = model('Project', projectSchema);
