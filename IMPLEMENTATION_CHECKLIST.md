# Implementation checklist

Legend: **Implemented** = code path exists in this MVP; **Partial** = basic path exists but full specification not complete; **Next phase** = not implemented and not represented as complete.

## Core (Priority 1)
- [x] Authentication, password hashing, signed httpOnly sessions, active-account check
- [x] Role checks in protected APIs and role-aware navigation
- [x] SQLite/Prisma persistence and repeatable fictional seed
- [x] Client-scoped projects and talent assigned-task scoping
- [x] Project create/list/search/filter/detail/status transitions
- [x] Task create/assign/board/status lifecycle validation
- [x] Private file upload/download authorization and version metadata
- [x] QA decision persistence endpoint and audit records
- [x] Database-backed notifications and read state
- [x] Dashboard statistics derived from database records
- [ ] Full client proposal approval / client deliverable approval UI
- [ ] Full episode → scene → shot hierarchy
- [ ] Full submission browser, comments, and QA rubric UI
- [ ] Password reset, invitations, rate limiting, CSRF/origin protection

## Business operations (Priority 2)
- [x] Talent profiles and deterministic candidate ranking function
- [x] Admin finance overview with incomplete values clearly labelled
- [x] Audit event schema and key event logging
- [x] Basic project messages endpoint with visibility separation
- [ ] Assessment authoring, submission, grading, certification UI
- [ ] Training course authoring, enrollment, tests, progress
- [ ] Invoice line items, payment CRUD, transaction-safe financial ledger
- [ ] Calendar month/week views and editable milestones
- [ ] CSV analytics export and complete date/client filters
- [ ] Audit-log viewer and user/permission administration
- [ ] Full talent scoring history and configurable weights UI

## Intelligence (Priority 3)
- [x] Rules-based production assistant based on current records
- [x] Transparent deterministic talent scoring helper with provisional flag
- [ ] Full recommendation UI with capacity/deadline feasibility explanations
- [ ] Schedule planning and workload-conflict engine
- [ ] External LLM provider adapter (not needed for local MVP)
- [ ] Cloud storage adapter and real-time collaboration

## Verification
- [ ] `npm install` verified
- [ ] Prisma schema generation verified
- [ ] Database seed verified
- [ ] Typecheck verified
- [ ] Lint verified
- [ ] Unit tests verified
- [ ] Production build verified
