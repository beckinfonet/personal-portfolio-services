#!/usr/bin/env node
// scripts/check-backend.mjs — D-11 readiness gate.
// Hit 7 endpoints against $PROD_API_URL; assert HTTP 200 + JSON shape + no placeholders.
// Exit 0 on full pass, 1 on any miss.

const BASE = process.env.PROD_API_URL ?? 'http://localhost:8080';
const FORBIDDEN = /lorem|example\.com|placeholder|Product Studio/i;

const ENDPOINTS = [
  { path: '/api/health',     shape: (b) => b && typeof b.status === 'string' },
  { path: '/api/profile',    shape: (b) => b && typeof b.name === 'string' && b.bio && typeof b.bio.short === 'string' && Array.isArray(b.socials) },
  { path: '/api/projects',   shape: (b) => Array.isArray(b) && (b.length === 0 || (typeof b[0].name === 'string' && Array.isArray(b[0].tech))) },
  { path: '/api/stack',      shape: (b) => Array.isArray(b) && (b.length === 0 || (typeof b[0].category === 'string' && Array.isArray(b[0].items))) },
  { path: '/api/experience', shape: (b) => Array.isArray(b) && (b.length === 0 || typeof b[0].company === 'string') },
  { path: '/api/apps',       shape: (b) => Array.isArray(b) && (b.length === 0 || (typeof b[0].name === 'string' && Array.isArray(b[0].platforms))) },
  { path: '/api/posts',      shape: (b) => Array.isArray(b) && (b.length === 0 || typeof b[0].title === 'string') }
];

const fails = [];
for (const e of ENDPOINTS) {
  try {
    const res = await fetch(`${BASE}${e.path}`);
    const txt = await res.text();
    if (res.status !== 200) { fails.push(`${e.path}: HTTP ${res.status}`); continue; }
    if (!res.headers.get('content-type')?.includes('application/json')) {
      fails.push(`${e.path}: content-type ${res.headers.get('content-type')}`); continue;
    }
    const json = JSON.parse(txt);
    if (!e.shape(json)) { fails.push(`${e.path}: shape check failed`); continue; }
    if (FORBIDDEN.test(txt)) { fails.push(`${e.path}: forbidden string match`); continue; }
    console.log(`✓ ${e.path}`);
  } catch (err) {
    fails.push(`${e.path}: ${err.message}`);
  }
}

if (fails.length > 0) {
  console.error(`\n✗ check-backend: ${fails.length} failure(s):`);
  for (const f of fails) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`\n✓ check-backend: all ${ENDPOINTS.length} endpoints green`);
