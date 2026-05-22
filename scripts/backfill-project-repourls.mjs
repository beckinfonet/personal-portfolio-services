#!/usr/bin/env node
// scripts/backfill-project-repourls.mjs
//
// Surgical, one-off backfill: adds the `repoUrls` field to the 4 existing
// project documents. Needed because the production MongoDB was last seeded
// before Phase 8 added `repoUrls`, so the live `/api/projects` documents lack
// the field — and the portfolio-web `/projects` page only fetches GitHub stats
// when `repoUrls` is present.
//
// Why not `npm run seed`: the full seeder upserts every collection from the
// seed files and would clobber hand-edited production values (profile
// highlights/shortName) and create duplicate app documents. This script does
// exactly one thing: `$set` `repoUrls` on the 4 projects, matched by `name`.
// It never touches any other field, never touches any other collection, never
// inserts or deletes a document.
//
// Usage:
//   railway run node scripts/backfill-project-repourls.mjs            # dry run — preview only
//   railway run node scripts/backfill-project-repourls.mjs --apply    # write the changes
//
// `railway run` injects the production MONGO_URI into the environment.

import 'dotenv/config';
import mongoose from 'mongoose';

// repoUrls keyed by the EXACT `name` of each project document (the seeder's
// upsert key). Values mirror portfolio-services/src/seed/projects.json.
const REPO_URLS = {
  'Validation Ledger': ['https://github.com/beckinfonet/validation-ledger-mobile'],
  'Looper': [
    'https://github.com/beckinfonet/LooperMobile',
    'https://github.com/beckinfonet/looper-agentic'
  ],
  'MoveIn: Real Estate': [
    'https://github.com/beckinfonet/jaytap-mobile',
    'https://github.com/beckinfonet/JayTap-services'
  ],
  'CarEx': [
    'https://github.com/beckinfonet/CarEx',
    'https://github.com/beckinfonet/carEx-services'
  ]
};

const APPLY = process.argv.includes('--apply');
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('ERROR: MONGO_URI is not set. Run via `railway run node scripts/backfill-project-repourls.mjs`.');
  process.exit(1);
}

async function main() {
  await mongoose.connect(MONGO_URI);
  console.log(`connected to ${mongoose.connection.host}`);
  console.log(APPLY ? 'mode: APPLY (writing changes)\n' : 'mode: DRY RUN (no writes — pass --apply to commit)\n');

  // Raw collection access — no schema, so the only possible write is the
  // explicit `$set: { repoUrls }` below. Mongoose pluralizes `Project` -> `projects`.
  const projects = mongoose.connection.db.collection('projects');

  let matched = 0;
  let modified = 0;
  let missing = 0;

  for (const [name, repoUrls] of Object.entries(REPO_URLS)) {
    const doc = await projects.findOne({ name });
    if (!doc) {
      missing++;
      console.log(`  [${name}]  NOT FOUND — no document with this exact name; skipped (nothing inserted)`);
      continue;
    }
    matched++;
    const current = JSON.stringify(doc.repoUrls ?? '(absent)');
    const target = JSON.stringify(repoUrls);
    if (current === target) {
      console.log(`  [${name}]  already correct: ${target}`);
      continue;
    }
    console.log(`  [${name}]`);
    console.log(`      current repoUrls: ${current}`);
    console.log(`      new repoUrls:     ${target}`);
    if (APPLY) {
      const res = await projects.updateOne({ name }, { $set: { repoUrls } });
      modified += res.modifiedCount;
      console.log(`      -> updated (modifiedCount=${res.modifiedCount})`);
    } else {
      console.log('      -> would update (dry run)');
    }
  }

  console.log(`\nsummary: ${matched} matched, ${missing} not found, ${APPLY ? modified + ' modified' : 'no writes (dry run)'}`);

  if (APPLY) {
    console.log('\nverification — repoUrls now on each project:');
    for (const name of Object.keys(REPO_URLS)) {
      const doc = await projects.findOne({ name });
      console.log(`  [${name}]  ${JSON.stringify(doc?.repoUrls ?? '(absent)')}`);
    }
  }

  await mongoose.disconnect();
  if (missing > 0) {
    console.error(`\nWARNING: ${missing} project name(s) did not match — verify the names above against the live DB.`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('backfill failed:', err);
  process.exit(1);
});
