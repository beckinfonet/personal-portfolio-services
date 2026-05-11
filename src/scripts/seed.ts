import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import mongoose from 'mongoose';
import { connectToDatabase } from '../config/database';
import { App } from '../models/App';
import { Experience } from '../models/Experience';
import { Post } from '../models/Post';
import { Profile } from '../models/Profile';
import { Project } from '../models/Project';
import { Stack } from '../models/Stack';

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

  // Pitfall 4: drop the orphaned `skills` collection (left over from Skill → Stack rename).
  // Code 26 = NamespaceNotFound — fine on a fresh Mongo or after first cleanup.
  try {
    await mongoose.connection.collection('skills').drop();
    console.log('seed: dropped legacy `skills` collection');
  } catch (e: unknown) {
    const code = (e as { code?: number })?.code;
    if (code !== 26) throw e;
    // collection didn't exist — silent success
  }

  // Stack — array collection, upsert by `category` (unique).
  const stack = await load<Array<{ category: string }>>('stack.json');
  for (const entry of stack) {
    await Stack.findOneAndUpdate(
      { category: entry.category },
      entry,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
  console.log(`seed: ${stack.length} stack categories upserted`);

  // Experience — array collection, composite upsert key (Pitfall 3: same company,
  // different periods is a real case — different roles at the same employer).
  const experience = await load<Array<{ company: string; period: string }>>('experience.json');
  for (const entry of experience) {
    await Experience.findOneAndUpdate(
      { company: entry.company, period: entry.period },
      entry,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
  console.log(`seed: ${experience.length} experience entries upserted`);

  // Apps — array collection, upsert by name (unique).
  const apps = await load<Array<{ name: string }>>('apps.json');
  for (const entry of apps) {
    await App.findOneAndUpdate(
      { name: entry.name },
      entry,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
  console.log(`seed: ${apps.length} apps upserted`);

  // Posts — array collection, upsert by slug (stable key).
  const posts = await load<Array<{ slug: string }>>('posts.json');
  for (const entry of posts) {
    await Post.findOneAndUpdate(
      { slug: entry.slug },
      entry,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
  console.log(`seed: ${posts.length} posts upserted`);

  // Projects — array collection, upsert by name (unique).
  const projects = await load<Array<{ name: string }>>('projects.json');
  for (const entry of projects) {
    await Project.findOneAndUpdate(
      { name: entry.name },
      entry,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
  console.log(`seed: ${projects.length} projects upserted`);

  const profileCount = await Profile.countDocuments();
  const stackCount = await Stack.countDocuments();
  const expCount = await Experience.countDocuments();
  const appsCount = await App.countDocuments();
  const postCount = await Post.countDocuments();
  const projectCount = await Project.countDocuments();
  console.log(`seed: final profile count = ${profileCount}`);
  console.log(`seed: final stack count = ${stackCount}`);
  console.log(`seed: final experience count = ${expCount}`);
  console.log(`seed: final apps count = ${appsCount}`);
  console.log(`seed: final post count = ${postCount}`);
  console.log(`seed: final project count = ${projectCount}`);
  console.log('seed: complete');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('seed failed:', err);
  process.exit(1);
});
