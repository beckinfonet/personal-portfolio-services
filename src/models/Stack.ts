import { Schema, model } from 'mongoose';

const stackSchema = new Schema(
  {
    category: { type: String, required: true, unique: true },
    items: { type: [String], required: true, default: [] }
  },
  { timestamps: true, strict: 'throw' }
);

export const Stack = model('Stack', stackSchema);
