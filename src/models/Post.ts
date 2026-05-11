import { Schema, model } from 'mongoose';

const postSchema = new Schema(
  {
    title:    { type: String, required: true },
    slug:     { type: String, required: true, unique: true },
    excerpt:  { type: String, required: true },
    date:     { type: String, required: true },
    readTime: { type: String, required: true },
    link:     { type: String, required: true }
  },
  { timestamps: true, strict: 'throw' }
);

export const Post = model('Post', postSchema);
