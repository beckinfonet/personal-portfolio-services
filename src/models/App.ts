import { Schema, model } from 'mongoose';

const appSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    stack: [{ type: String, required: true }],
    url: { type: String, required: true }
  },
  { timestamps: true }
);

export const App = model('App', appSchema);
