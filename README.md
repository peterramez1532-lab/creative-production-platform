# Creative Production Platform

A local-first, database-backed MVP for managed creative production. Built with Next.js App Router, React, TypeScript, Prisma, and SQLite. This is a production operations system—not a freelancer marketplace.

## Implemented in this MVP

- Server-side session authentication (httpOnly signed cookie), bcrypt password hashes, account-active checks, logout, and role checks.
- Four demo roles: Admin, Production Manager, Client, and Talent.
- SQLite persistence through Prisma; repeatable seed script with fictional organizations, projects, tasks, talent, notifications, milestones, and an invoice.
- Project list, search/status filters, create form, detail view, validated status transitions, role-scoped client and talent project access.
- Task board, create/assign flow, assignment notifications, assignee-scoped talent access, and guarded task lifecycle.
- Secure local upload/download route with MIME allowlist, size limit, safe generated storage names, version metadata, and role-aware file authorization.
- QA decision endpoint with stored review history and a basic separation-of-duties check.
- Database-backed notifications and mark-read behavior.
- Dashboard metrics and analytics computed from stored projects/tasks; restricted finance overview for admins.
- Deterministic rules-based production assistant; it clearly identifies itself as rules-based and needs no external AI key.
- Audit records for sign-ins, project/task updates, and uploads.
- Unit tests for workflow transitions and deterministic talent scoring.
- Responsive desktop/tablet/mobile shell with separate navigation visibility by role.

## Important scope notes

This is a working MVP, not a claim that every module in the master specification is complete. Full episode/scene/shot hierarchy, rich assessment authoring and grading UI, course enrollment/progress, full invoice/payment CRUD, complete message moderation, calendar month/week UI, external email, cloud object storage, and LLM integration are future phases. The UI labels incomplete sections honestly rather than inventing data. QA decision endpoint is implemented; a polished submission-version browser and review screen are still limited. Review `IMPLEMENTATION_CHECKLIST.md` for details.

## Requirements

- Node.js 20.9+ (Node 22 LTS recommended)
- npm
- Windows, macOS, or Linux

## Quick start — Windows PowerShell

```powershell
# Extract the ZIP and open a terminal in the extracted folder
Copy-Item .env.example .env
# Replace SESSION_SECRET with a random value of 32+ characters before running
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Open http://localhost:3000.

You can also use `npm run setup` after `npm install`; it creates `.env` if absent, generates Prisma Client, applies the schema with `prisma db push`, and seeds demo data. For a production deployment, create and commit a reviewed migration instead of relying on `db push`.

## macOS / Linux

```bash
cp .env.example .env
# Change SESSION_SECRET to a random value of 32+ characters
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

## Demo credentials

These accounts are only for local demonstration. Change/remove them before deployment.

| Role | Email | Password |
|---|---|---|
| Admin | `admin@creativeops.local` | `DemoAdmin!2026` |
| Production Manager | `manager@creativeops.local` | `DemoManager!2026` |
| Client | `client@creativeops.local` | `DemoClient!2026` |
| Talent | `talent@creativeops.local` | `DemoTalent!2026` |
| Second Client | `client2@creativeops.local` | `DemoClient!2026` |
| Second Artist | `artist2@creativeops.local` | `DemoTalent!2026` |

## Environment variables

- `DATABASE_URL`: defaults to `file:./dev.db` in Prisma configuration. Prisma resolves this SQLite URL relative to the `prisma` folder.
- `SESSION_SECRET`: required, minimum 32 characters. Use a cryptographically random value in every environment.
- `APP_URL`: canonical app URL for deployment configuration.
- `UPLOAD_DIR`: local private upload directory (default `./storage`).
- `MAX_UPLOAD_MB`: maximum upload size in MiB (default 50).

No paid service or AI API key is required for local use.

## Useful commands

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm test
npm run db:generate
npm run db:migrate
npm run db:seed
```

`npm run db:reset` intentionally requires `CONFIRM_RESET=YES` and removes `prisma/dev.db`. Afterward run `npm run setup`. Never run it against production data.

## Troubleshooting

- **Prisma cannot find `DATABASE_URL`:** make sure `.env` exists in the project root and has a valid SQLite URL.
- **Session secret error:** set `SESSION_SECRET` to a random string at least 32 characters long, then restart the server.
- **Login fails:** run `npm run db:seed` after `npx prisma db push`; check that the email is typed exactly.
- **Database schema mismatch:** run `npx prisma db push` for local development, then `npx prisma generate`.
- **Upload fails:** verify `UPLOAD_DIR` is writable. The default `./storage` directory is private and not served as a public static folder.
- **Unsupported file:** only common image formats, PDF, MP4/MOV, ZIP, and plain text are allowed by the MVP.
- **Port 3000 busy:** stop the other process or run `npm run dev -- -p 3001`.
- **Build memory errors:** use Node 22 LTS, close memory-heavy apps, and retry `npm run build`.
- **Windows PowerShell policy:** if npm scripts are blocked, use `cmd.exe` or adjust your local execution policy according to your organization's policy.

## Security and deployment warning

This project is intended for local demonstration and controlled development. Before public production use: rotate demo credentials; use HTTPS; provision a persistent PostgreSQL database and S3-compatible private object storage; add rate limiting and CSRF/origin controls; implement password reset and invitation flows; review all authorization rules; configure backups and retention; run dependency/security scans; and add monitoring. Local SQLite and disk uploads are not suitable for ephemeral serverless deployments.

## Production deployment outline

1. Configure a managed PostgreSQL database and update Prisma's datasource provider/schema and migration workflow (SQLite-to-PostgreSQL requires reviewing provider-specific types, migrations, and constraints).
2. Configure private S3-compatible object storage by implementing the existing storage boundary in `app/api/files/route.ts`.
3. Set `SESSION_SECRET`, `DATABASE_URL`, `APP_URL`, and storage configuration as server-only environment variables.
4. Apply committed Prisma migrations as a deployment step; do not run seed demo users in production.
5. Create the initial administrator through a secure one-time provisioning process, not a public signup.
6. Configure scheduled notification processing and email delivery in a persistent worker/job system if needed.
7. Test backup restore, access isolation, uploads, and session expiry before inviting clients.

## Architecture

See `ARCHITECTURE.md`, `DATABASE.md`, `PERMISSIONS.md`, `DEPLOYMENT.md`, and `IMPLEMENTATION_CHECKLIST.md`.
