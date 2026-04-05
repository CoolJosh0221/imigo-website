# Task Plan: Migrate Admin Dashboard from GitHub API to Turso Database

## Goal
Replace the GitHub Contents API backend with Turso (libSQL/SQLite) for instant saves, draft/publish workflow, no race conditions, and easy self-hosting portability. Rewrite public readers (`lib/blog.ts`, `lib/events.ts`) to read from DB. Keep Vercel Blob for images.

## Current Phase
Phase 8 (final testing)

## Branch
`feat/admin-db-backend` (main stays untouched)

## Phases

### Phase 1: Requirements & Discovery
- [x] Identify problems with current approach
- [x] Gather user requirements
- [x] Evaluate alternative backends
- [x] Document findings in findings.md
- **Status:** complete

### Phase 2: Architecture & Schema Design
- [x] Design Turso database schema (posts table, events table)
- [x] Plan Drizzle ORM setup
- [x] Map existing frontmatter fields → DB columns
- [x] Plan draft/publish status field
- [x] Document migration path for existing markdown content
- [x] Plan self-hosting configuration (env-based DB URL switching)
- **Status:** complete

### Phase 3: Database Setup & ORM
- [x] Install `@libsql/client` and `drizzle-orm` + `drizzle-kit`
- [x] Define Drizzle schema (`db/schema.ts`)
- [x] Create `lib/db.ts` connection helper (lazy, env-based URL for self-hosting)
- [x] Create `drizzle.config.ts`
- [ ] User needs to: create Turso database + set env vars
- [ ] User needs to: run migration script
- **Status:** complete (code done, awaiting user DB setup)

### Phase 4: Rewrite Public Readers
- [x] Rewrite `lib/blog.ts` to query Turso via Drizzle
- [x] Rewrite `lib/events.ts` to query Turso via Drizzle
- [x] Update `lib/content.ts` (all functions now async)
- [x] Update all calling pages to await async functions
- [x] Add `status` filtering (only show `published` posts on public site)
- [x] Pages use `force-dynamic` since they read from DB at request time
- **Status:** complete

### Phase 5: Rewrite Admin Actions
- [x] Rewrite `lib/admin-actions.ts` to use Drizzle
- [x] Remove `lib/github.ts`
- [x] Add draft/publish toggle actions (`togglePostStatus`, `toggleEventStatus`)
- [x] Bilingual content stored as DB columns (no separate files)
- **Status:** complete

### Phase 6: Admin UI Updates
- [x] Add draft/publish status dropdown to PostEditor and EventEditor
- [x] Update list pages to show draft status badge
- [x] Add "Publish" / "Unpublish" toggle buttons to list pages
- [x] Update dashboard counts (separate draft vs published counts)
- [x] Bilingual admin UI preserved
- **Status:** complete

### Phase 7: Content Migration
- [x] Write migration script (`scripts/migrate-content.ts`)
- [ ] User needs to: run `npx tsx scripts/migrate-content.ts` after DB setup
- **Status:** complete (script written, awaiting user execution)

### Phase 8: Cleanup & Testing
- [x] Remove `lib/github.ts`
- [x] Full build verification (passes)
- [ ] User needs to: set up Turso DB + run migration + test end-to-end
- [ ] Remove `/content/blog/` and `/content/events/` after migration verified
- **Status:** in_progress

## All Questions — Answered
1. ~~Branch workflow vs DB?~~ → **Database (Turso)**
2. ~~Draft/publish workflow?~~ → **Yes, drafts supported**
3. ~~Multi-user?~~ → **Single password (keep current auth)**
4. ~~Real-time preview?~~ → **Instant via DB reads**
5. ~~Budget?~~ → **Free tier only**
6. ~~Modify lib/blog.ts & lib/events.ts?~~ → **Yes, rewrite to read from Turso**
7. ~~Content volume?~~ → **Small, free tier sufficient**
8. ~~Self-hosting?~~ → **Yes, must be easy — env-based DB URL**

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| GitHub Contents API → Turso DB | Instant saves, no race conditions, no redeploy needed |
| Turso (libSQL/SQLite) | 9GB free, no inactivity pause, SQLite = copy file to self-host |
| Drizzle ORM | Type-safe, lightweight, excellent libSQL support |
| Keep Vercel Blob for images | Already working, SQLite not designed for binary blobs |
| Rewrite public readers | One source of truth (DB), instant publish, cleaner self-hosting |
| Draft/publish workflow | Posts can be saved without going live |
| Single password auth | Keep existing cookie-based auth unchanged |
| Env-based DB URL | `TURSO_DATABASE_URL` switches between cloud and local SQLite |
| Work on `feat/admin-db-backend` branch | Main branch stays functional |
| Bilingual content as DB columns | `title_en`, `title_zh`, `content_en`, `content_zh` — no separate files |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| drizzle.config.ts `driver: 'turso'` invalid | 1 | Changed to `dialect: 'turso'` (drizzle-kit API changed) |
| `dotenv` import in migrate script fails build | 1 | Excluded `scripts/` from tsconfig |
| DB connection fails at build time (no env vars) | 1 | Made DB client lazy (Proxy pattern), only connects on first query |
| `generateStaticParams` fails without DB | 1 | Added try/catch returning `[]`, pages use `force-dynamic` |
| TypeScript implicit `any` on catch variable | 1 | Used `.catch()` with typed fallback |

## Notes
- Self-hosting: Turso can run as a local `libsql-server` or just a raw SQLite file. The Drizzle config + `@libsql/client` supports both `libsql://` (cloud) and `file:` (local) URLs via the same env var.
- Current admin has full bilingual i18n (lib/admin-i18n.ts) — must preserve
- Migration script should be runnable to seed DB from existing markdown files
