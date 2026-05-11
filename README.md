# Portfolio Services

TypeScript Node/Express backend for portfolio content.

## Setup

1. Copy `.env.example` to `.env`.
2. Install dependencies:
   - `npm install`
3. Run in development:
   - `npm run dev`

## Scripts

- `npm run dev` - run server with hot reload
- `npm run build` - compile TypeScript to `dist`
- `npm run start` - start compiled server from `dist`
- `npm run test` - run Jest test suite

## API Endpoints

- `GET /api/health`
- `GET /api/profile`
- `GET /api/projects`
- `GET /api/stack`
- `GET /api/experience`
- `GET /api/apps`
- `GET /api/posts?limit=3`

Full contract: [docs/api-contract.md](./docs/api-contract.md)

## Deployment

**Production:** Railway — https://personal-portfolio-services-production.up.railway.app
**Database:** Railway MongoDB plugin (managed); seed via `npm run seed` against the prod `MONGO_URI`
**Frontend consumer:** [portfolio-web](https://github.com/beckinfonet/personal-portfolio-web) (Next.js 15, RSC fetches via `NEXT_PUBLIC_API_BASE_URL`)
**Smoke gate:** `PROD_API_URL=https://personal-portfolio-services-production.up.railway.app npm run smoke`

## Notes

- Data comes from MongoDB when collections are populated.
- If collections are empty, endpoints fall back to placeholder seed data in `src/seed/placeholders.ts`.
