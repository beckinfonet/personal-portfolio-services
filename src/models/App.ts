import { Schema, model } from 'mongoose';

// Mirror of portfolio-web/lib/types.ts ShippedApp (paired-commit / D-19).
// strict: 'throw' fails loud on legacy fields (description/stack/url) per Pitfall 2.
// Pre-existing Mongo docs in the old shape will need to be re-seeded.
const appSchema = new Schema(
  {
    name:          { type: String, required: true, unique: true },
    platforms:     { type: [{ type: String, enum: ['ios', 'android'] }], required: true },
    appStoreUrl:   { type: String, required: false },
    googlePlayUrl: { type: String, required: false },
    role:          { type: String, required: true },
    year:          { type: String, required: true },
    summary:       { type: String, required: false }
  },
  { timestamps: true, strict: 'throw' }
);

export const App = model('App', appSchema);
