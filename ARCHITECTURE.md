# Architecture

- **Presentation:** Next.js App Router server layouts and client-side interactive workspace views.
- **Authentication:** `lib/auth.ts` issues an HS256 signed JWT in an httpOnly, sameSite=lax cookie. Every protected layout/API re-reads the user from the database and verifies the account is active.
- **API layer:** Route handlers in `app/api/**` validate inputs and apply role/organization/task checks server-side.
- **Business logic:** `lib/workflows.ts` controls project/task transitions; `lib/scoring.ts` ranks candidates deterministically and labels sparse evidence provisional; `lib/validation.ts` provides Zod schemas.
- **Persistence:** Prisma ORM with SQLite for local development.
- **Files:** upload bytes are written to a private local directory using random server-generated names; metadata/version is stored in `Submission`. GET download rechecks authorization.
- **Operations:** notifications and audit records are persisted in SQLite.
- **Assistant:** rules-based server analysis of current database records; no LLM call is made.

## Request flow

Browser → Next.js route handler → authentication + authorization → Zod validation → service/business rule → Prisma transaction/query → persisted database → JSON response → refreshed UI.

## Extension boundaries

Move DB calls into dedicated services as the domain grows; replace local file adapter with S3-compatible private object storage; replace SQLite with PostgreSQL after provider migration review; add a configured LLM adapter behind server-only credentials.
