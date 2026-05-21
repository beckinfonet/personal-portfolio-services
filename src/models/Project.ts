import { Schema, model } from 'mongoose';

const projectSchema = new Schema(
  {
    name:    { type: String, required: true, unique: true },
    year:    { type: String, required: true },
    status:  { type: String, required: true },
    summary: { type: String, required: true },
    tech:    { type: [String], required: true, default: [] },
    role:    { type: String, required: true },
    link:    { type: String, required: true },
    // Phase 8 (SCHEMA-01): optional, additive. Public GitHub repo URLs for the
    // v1.1 GitHub-stats fetch. No `required`, no `default`, no schema regex —
    // matches the `link` precedent (HTTPS/format checks live in tests).
    repoUrls: { type: [String] }
  },
  { timestamps: true, strict: 'throw' }
);

export const Project = model('Project', projectSchema);
