# Deployment guide

This project is configured for local SQLite and private disk uploads. Do not deploy this configuration to an ephemeral serverless environment for real client work.

## Before production

1. Rotate all seeded passwords and remove demo accounts.
2. Set a unique 32+ character `SESSION_SECRET`; never expose it with a `NEXT_PUBLIC_` prefix.
3. Provision PostgreSQL and update Prisma provider/schema. Generate reviewed migrations and rehearse backup/restore.
4. Implement an S3-compatible private storage adapter and signed/authorized downloads. Do not serve storage as public static files.
5. Deploy to a supported Node.js host with persistent database and object storage.
6. Configure HTTPS, secure cookies, origin/CSRF protection, rate limits, logging/monitoring, secret rotation, and vulnerability scanning.
7. Configure an external scheduled worker for deadline notifications; no in-memory scheduled process is relied on here.
8. Configure email or LLM credentials only if those adapters are implemented. The current assistant is rules-based; no email is sent.
9. Run type checking, tests, build, and a role-by-role acceptance pass on staging.
10. Create an admin through a one-time secure provisioning process; do not seed demo users in production.

## Hosting notes

Vercel/other ephemeral serverless hosts do not guarantee persistence of local SQLite files or `./storage`. Use managed PostgreSQL and private object storage. Local `npm run build` does not validate external production credentials or provider networking.
