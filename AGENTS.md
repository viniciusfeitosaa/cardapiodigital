# AGENTS.md

## Cursor Cloud specific instructions

This repo is a multi-tenant digital menu SaaS with two services plus a PostgreSQL database.
Standard setup/run commands live in `README.md` ("Desenvolvimento" section) and the
`scripts` blocks of `backend/package.json` and `frontend/package.json`. Notes below only
cover non-obvious caveats for running things in this environment.

### Services

| Service  | Path       | Stack              | Dev command                  | Port |
| -------- | ---------- | ------------------ | ---------------------------- | ---- |
| backend  | `backend`  | NestJS + TypeORM   | `npm run start:dev`          | 3000 |
| frontend | `frontend` | Next.js 14 (App)   | `npm run dev -- -p 3001`     | 3001 |

The update script runs `npm install` in both `backend` and `frontend`, so dependencies are
already installed on startup.

### PostgreSQL (required by backend)

- PostgreSQL 16 is installed system-wide but is NOT started automatically. Start it before
  running the backend: `sudo pg_ctlcluster 16 main start` (or `sudo service postgresql start`).
- Dev database/credentials (already created, data persists on disk): db `cardapio_db`,
  user `cardapio_user`, password `cardapio_pass`.
- TypeORM `synchronize` is enabled whenever `NODE_ENV !== 'production'`, so tables are
  auto-created on backend startup — there are no migrations to run.

### Backend env (`backend/.env`, gitignored — recreate if missing)

```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://cardapio_user:cardapio_pass@127.0.0.1:5432/cardapio_db
JWT_SECRET=dev-super-secret-jwt-key-change-me
ADMIN_EMAIL=admin@cardapio.com
ADMIN_PASSWORD=Admin@123456
```

`app.module.ts` reads `DATABASE_URL`, so it must point at `127.0.0.1` when running the
backend directly (the value in `docker-compose.yml` uses the `postgres` docker hostname).

### Frontend env (`frontend/.env.local`, gitignored — recreate if missing)

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

The frontend must run on a port other than 3000 (the backend uses 3000); use
`npm run dev -- -p 3001`.

### Auth / seeding

- There is no DB seeder. Create users via `POST /auth/register` (role defaults to `staff`,
  which the login UI routes to `/dashboard/restaurant`; `admin` routes to `/dashboard/admin`).
- Swagger API docs: http://localhost:3000/api-docs.

### Lint / build

- Standalone lint is NOT configured: neither project has an ESLint config committed and
  `npm run lint` (`next lint`) prompts interactively on first run. Type + lint validation is
  effectively done by `npm run build` in each project (`next build` type-checks and lints).
