// src/scripts/seed.ts — D-13 idempotent upsert runner.
// Waves 02-07 each add one upsert block (profile, stack, experience, apps, posts, projects).
// Wave 02 will also add the legacy `skills` collection drop (Pitfall 4 / RESEARCH §"Anti-Patterns").
import 'dotenv/config';
import mongoose from 'mongoose';
import { connectToDatabase } from '../config/database';

async function seed(): Promise<void> {
  await connectToDatabase();
  console.log('seed: connected to', mongoose.connection.host ?? '(unknown host)');
  // Wave 02 inserts profile upsert here.
  // Wave 03 inserts stack upsert + legacy `skills` drop here.
  // Wave 04 inserts experience upsert here.
  // Wave 05 inserts apps upsert here.
  // Wave 06 inserts posts upsert here.
  // Wave 07 inserts projects upsert here.
  console.log('seed: complete');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('seed failed:', err);
  process.exit(1);
});
