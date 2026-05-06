import { Schema, model } from 'mongoose';

const profileSchema = new Schema(
  {
    fullName: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true }
  },
  { timestamps: true }
);

export const Profile = model('Profile', profileSchema);
