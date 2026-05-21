# Portfolio Services — API Contract

**Single consumer:** portfolio-web (Next.js 15 RSC fetches via lib/api.ts)
**Mirror:** portfolio-web/lib/types.ts is the canonical type source. Update both sides in paired commits per CLAUDE.md / D-19.
**CORS:** intentionally absent — RSC fetches are server-side. Re-add via `cors` middleware if a browser-side admin UI lands (Phase 7+).
**Auth:** all endpoints public read-only (D-12). Admin/auth deferred to Phase 7.

## GET /api/health

_filled by Wave 01 (this plan)_

**Response 200:**
```ts
{ status: "ok" }
```

## GET /api/profile

**Response 200 — type from portfolio-web/lib/types.ts Profile:**
```ts
interface Profile {
  name: string;
  shortName: string;
  initials: string;
  role: string;
  location: string;
  email: string;
  resumeUrl: string;
  bio: { short: string; long: string[] };
  highlights: Array<{ value: string; label: string }>;
  socials: Array<{
    label: string;
    handle: string;
    url: string;
    kind: "github" | "linkedin" | "mastodon" | "bluesky" | "x" | "email" | "other";
  }>;
}
```

**Response 503:** `{ error: string }` — Mongo connection not ready or document not seeded. Frontend treats as fallback trigger.

**Frontend cache:** `next: { revalidate: 300 }` (5-min ISR).

**Example payload:** see `src/seed/profile.json`.

## GET /api/stack

**Response 200 — type from portfolio-web/lib/types.ts StackCategory[]:**
```ts
type StackCategory = {
  category: string;  // e.g. "languages", "frameworks", "cloud", "ai"
  items: string[];   // e.g. ["TypeScript", "Python", "Swift"]
};

type Response = StackCategory[];
```

**Response 503:** `{ error: string }` — Mongo connection not ready or collection empty. Frontend treats as fallback trigger.

**Frontend cache:** `next: { revalidate: 300 }` (5-min ISR).

**Example payload:** see `src/seed/stack.json`.

**Note (Phase 6 brownfield):** This endpoint replaces the legacy `/api/skills` route (renamed in same commit; old route returns 404). The legacy `skills` Mongo collection is dropped on first `npm run seed` run.

## GET /api/experience

**Response 200 — type from portfolio-web/lib/types.ts Experience[]:**
```ts
interface Experience {
  company: string;
  role: string;
  period: string;   // "2022 - present" or "2019 - 2022"
  summary: string;  // max ~64 chars in view rendering
}

type Response = Experience[];
```

**Response 503:** `{ error: string }` — Mongo not ready or collection empty.

**Frontend cache:** `next: { revalidate: 300 }`.

**Example payload:** see `src/seed/experience.json`.

**Note:** This endpoint dropped the legacy `startDate`/`endDate`/`highlights[]` fields in Phase 6 Wave 04 (paired commit). Documents authored under the old shape will fail the new schema's `strict: 'throw'` and must be re-seeded.

## GET /api/apps

**Response 200 — type from portfolio-web/lib/types.ts ShippedApp[]:**
```ts
interface ShippedApp {
  name: string;
  platforms: Array<"ios" | "android">;
  appStoreUrl?: string;       // present when "ios" in platforms (Pitfall 5: canonical HTTPS form)
  googlePlayUrl?: string;     // present when "android" in platforms
  role: string;
  year: string;
  summary?: string;
}

type Response = ShippedApp[];   // sorted by year desc
```

**Response 503:** `{ error: string }` — Mongo not ready or fetch failed.

**Frontend cache:** `next: { revalidate: 300 }`.

**Example payload:** see `src/seed/apps.json`.

**Note:** Phase 6 Wave 05 dropped the legacy `description` / `stack[]` / `url` fields. Store URLs use canonical HTTPS form (`https://apps.apple.com/...`, `https://play.google.com/store/apps/details?id=...`) — works on both iOS and Android via universal/app links + web fallback (Pitfall 5). Pre-existing Mongo docs in the old shape will fail the new schema's `strict: 'throw'` and must be re-seeded.

## GET /api/posts

**Query params:**
- `limit` (optional, default 3): max number of posts to return.

**Response 200 — type from portfolio-web/lib/types.ts Writing[]:**
```ts
interface Writing {
  title: string;
  slug: string;
  excerpt: string;
  date: string;       // "April 2026" — uppercased on render
  readTime: string;   // "5 min read"
  link: string;       // https URL
}

type Response = Writing[];   // sorted by date desc, capped at ?limit
```

**Response 503:** `{ error: string }` — Mongo not ready or fetch failed.

**Frontend cache:** `next: { revalidate: 300 }`.

**Example payload:** see `src/seed/posts.json`.

**Note:** Phase 6 Wave 06 renamed `publishedAt` → `date` and added `readTime`/`link`. The legacy 4 placeholder posts are replaced by the single new-shape entry; the array is intentionally short (D-15: v1 ships exactly 1 real post). Pre-existing Mongo docs in the old shape will fail the new schema's `strict: 'throw'` and must be re-seeded.

## GET /api/projects

**Response 200 — type from portfolio-web/lib/types.ts Project[]:**
```ts
interface Project {
  name: string;
  year: string;
  status: string;     // "shipped" | "active" | "archived"
  summary: string;
  tech: string[];
  role: string;
  link: string;       // https URL
  repoUrls?: string[];  // optional public GitHub repo URLs for v1.1 stats
}

type Response = Project[];   // sorted by year desc
```

**Response 503:** `{ error: string }`.

**Frontend cache:** `next: { revalidate: 300 }`.

**Example payload:** see `src/seed/projects.json`.

**Note:** Phase 6 Wave 07 added this endpoint (BACKEND-01). New `Project` model + `getProjects` controller + route line; mirror frontend constant in portfolio-web/lib/portfolio-data.ts.

**Note:** Phase 8 (SCHEMA-01..07) added the optional, additive `repoUrls?: string[]` field — public GitHub repo URLs consumed by the v1.1 GitHub-stats fetch. Optional: an entry with no public repo simply omits it.
