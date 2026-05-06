import { Schema, model } from 'mongoose';

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    excerpt: { type: String, required: true },
    publishedAt: { type: String, required: true }
  },
  { timestamps: true }
);

export const Post = model('Post', postSchema);
