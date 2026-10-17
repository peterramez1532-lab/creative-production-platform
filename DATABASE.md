# Database schema

The Prisma schema is the source of truth at `prisma/schema.prisma`.

- `User` holds credentials, role, account status, and optional organization membership.
- `Organization` owns client workspace identity.
- `TalentProfile` extends a talent user with skills, specialization, availability, experience, and measured quality/reliability.
- `Project` belongs optionally to an organization and manager, and holds status, dates, priority, and financial fields.
- `Task` belongs to a project, is created by a manager, and can be assigned to one talent user.
- `Submission` stores immutable per-version file metadata and points to the private disk key.
- `QAReview` preserves each decision, score, reviewer, feedback, and timestamp.
- `Milestone`, `Message`, `Notification`, `Invoice`, and `AuditLog` support operational workflows.

Indexes cover status/deadline queues, organization scoping, assignee queues, notifications, and audit history. Project deletion is restricted when tasks exist; submissions and milestones cascade with project deletion, while normal production policy should prefer archiving rather than deleting.

## Local setup

`npx prisma db push` creates the SQLite schema; `npx prisma db seed` is not configured as a Prisma built-in seed command, so use `npm run db:seed` (`tsx prisma/seed.ts`). `npm run setup` automates local schema push and seed.

## PostgreSQL migration

Change the Prisma datasource provider to `postgresql`, configure a PostgreSQL URL, review all migration SQL, then create a new migration from the schema. SQLite and PostgreSQL differ in enum handling and some constraints; do not reuse SQLite migrations unchanged.
