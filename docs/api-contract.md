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

_filled by Wave 04_

## GET /api/apps

_filled by Wave 05_

## GET /api/posts

_filled by Wave 06_

## GET /api/projects

_filled by Wave 07_
