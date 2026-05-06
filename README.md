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
- `GET /api/skills`
- `GET /api/experience`
- `GET /api/apps`
- `GET /api/posts?limit=3`

## Notes

- Data comes from MongoDB when collections are populated.
- If collections are empty, endpoints fall back to placeholder seed data in `src/seed/placeholders.ts`.
