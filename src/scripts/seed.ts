import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import mongoose from 'mongoose';
import { connectToDatabase } from '../config/database';
import { Profile } from '../models/Profile';

// CommonJS module target: use __dirname (Rule-3 deviation from plan's
// import.meta.url; tsconfig.json module=commonjs rejects import.meta).
const SEED_DIR = join(__dirname, '..', 'seed');

async function load<T = unknown>(name: string): Promise<T> {
  const raw = await readFile(join(SEED_DIR, name), 'utf8');
  return JSON.parse(raw) as T;
}

async function seed(): Promise<void> {
  await connectToDatabase();
  console.log('seed: connected to', mongoose.connection.host ?? '(unknown host)');

  // Profile — single-doc collection, upsert by email (stable identity).
  const profile = await load<{ email: string }>('profile.json');
  await Profile.findOneAndUpdate(
    { email: profile.email },
    profile,
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  console.log(`seed: profile upserted (email=${profile.email})`);

  // Wave 03 inserts stack upsert + legacy `skills` drop here.
  // Wave 04 inserts experience upsert here.
  // Wave 05 inserts apps upsert here.
  // Wave 06 inserts posts upsert here.
  // Wave 07 inserts projects upsert here.

  const profileCount = await Profile.countDocuments();
  console.log(`seed: final profile count = ${profileCount}`);
  console.log('seed: complete');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('seed failed:', err);
  process.exit(1);
});
