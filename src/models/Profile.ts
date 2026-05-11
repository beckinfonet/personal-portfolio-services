import { Schema, model } from 'mongoose';

const bioSchema = new Schema(
  {
    short: { type: String, required: true },
    long:  { type: [String], required: true }
  },
  { _id: false }
);

const highlightSchema = new Schema(
  {
    value: { type: String, required: true },
    label: { type: String, required: true }
  },
  { _id: false }
);

const socialSchema = new Schema(
  {
    label:  { type: String, required: true },
    handle: { type: String, required: true },
    url:    { type: String, required: true },
    kind:   {
      type: String,
      enum: ['github','linkedin','mastodon','bluesky','x','email','other'],
      required: true
    }
  },
  { _id: false }
);

const profileSchema = new Schema(
  {
    name:      { type: String, required: true },
    shortName: { type: String, required: true },
    initials:  { type: String, required: true },
    role:      { type: String, required: true },
    location:  { type: String, required: true },
    email:     { type: String, required: true },
    resumeUrl: { type: String, required: true },
    bio:        { type: bioSchema, required: true },
    highlights: { type: [highlightSchema], default: [] },
    socials:    { type: [socialSchema], default: [] }
  },
  { timestamps: true, strict: 'throw' }
);

export const Profile = model('Profile', profileSchema);
