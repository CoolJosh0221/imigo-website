# Findings & Decisions

## Requirements
- Replace GitHub Contents API (direct commits to main) with a better backend
- Fix race conditions on concurrent edits
- Reduce or eliminate publish delay (~2 min Vercel redeploy)
- Work should be done on a new branch
- Preserve bilingual admin UI (EN/ZH Traditional Chinese)
- Must be easy to migrate to self-hosted server later
- Free tier only
- User chose: Database approach (Option A)
- Draft/publish workflow: Yes
- Multi-user: No, keep single password
- Rewrite public readers: Yes, read from Turso DB

## Current Architecture (Problems)
- **Storage:** Markdown files in `/content/blog/` and `/content/events/` with YAML frontmatter
- **Admin writes:** `lib/github.ts` calls GitHub Contents API → commits directly to `main`
- **Public reads:** `lib/blog.ts` and `lib/events.ts` use `fs.readFileSync` at build time
- **Images:** Vercel Blob (`@vercel/blob`)
- **Auth:** Cookie-based password auth (`ADMIN_PASSWORD` env var)

### Problems with current approach
1. **Slow:** Every edit triggers Vercel redeploy (~2 min before content is live)
2. **Race conditions:** GitHub Contents API requires SHA for updates — concurrent edits fail with 409 Conflict
3. **No drafts:** Every save is immediately published (after redeploy)
4. **No undo:** Reverting requires git knowledge
5. **Fragile:** Network errors mid-save can leave partial state (EN saved, ZH failed)

## Backend Alternatives Under Consideration

### Option A: Database (Supabase / Turso / Vercel Postgres)
- **Pros:** Instant saves, real-time reads, draft/publish, no race conditions (DB handles concurrency), rich querying
- **Cons:** Must rewrite `lib/blog.ts` and `lib/events.ts` to read from DB instead of filesystem, migration effort, ongoing cost (most have free tiers), need to handle DB schema
- **Cost:** Supabase free tier = 500MB, Turso free = 9GB, Vercel Postgres free = 256MB

### Option B: Git Branch + PR Workflow
- **Pros:** Content stays in git, versioned, review before publish, existing readers unchanged
- **Cons:** Still slow (PR merge → redeploy), more complex (branch management), still no instant preview, GitHub API rate limits
- **Cost:** Free

### Option C: Hybrid (DB for admin, filesystem for public)
- **Pros:** Instant admin saves, existing public readers unchanged (ISR/revalidation pulls from DB at build)
- **Cons:** Two sources of truth, sync complexity, must rewrite `getPostById` etc. to read from DB
- **Cost:** DB free tier

### Option D: Hybrid (DB for admin, generate markdown on publish)
- **Pros:** Admin works with DB (fast, no conflicts), "Publish" button generates markdown + commits to git, existing readers completely unchanged
- **Cons:** Publish still triggers redeploy, more moving parts
- **Cost:** DB free tier

## Database Platform Comparison (for self-hosting portability)

| | Turso (libSQL) | Supabase | Appwrite |
|---|---|---|---|
| **Free tier DB** | 9GB | 500MB | 1GB |
| **Free tier files** | None (use Vercel Blob) | 1GB (S3-compatible) | 2GB |
| **Inactivity pause** | No | Yes (1 week) | No |
| **Self-host ease** | Trivial (SQLite file copy) | Docker (PostgreSQL) | Docker (more services) |
| **Next.js ecosystem** | Excellent (Drizzle ORM) | Excellent (official SDK) | Fair |
| **Underlying DB** | SQLite (edge-ready) | PostgreSQL | MariaDB |
| **Portability** | Copy .db file anywhere | pg_dump / Docker | Docker export |

**Recommendation: Turso** — largest free tier, no inactivity kill, SQLite portability means moving to a local server is literally copying a file.

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| Turso (libSQL) for content storage | 9GB free, no inactivity pause, SQLite = trivially portable to self-hosted |
| Keep Vercel Blob for images | Already working, Turso isn't designed for binary blobs |
| Drizzle ORM for DB access | Type-safe, lightweight, excellent Turso/libSQL support |
| Rewrite public readers to query DB | One source of truth, instant publish, simpler self-hosting |
| Draft/publish workflow | Posts saved as `draft` not visible on public site until set to `published` |
| Single password auth | Keep existing cookie-based auth, no changes needed |
| Bilingual as DB columns | `title_en`/`title_zh`, `content_en`/`content_zh` etc. — single row per post |

## Proposed Database Schema

### `posts` table
| Column | Type | Notes |
|--------|------|-------|
| id | integer (PK, auto) | |
| slug | text (unique) | URL-friendly identifier |
| title_en | text | |
| title_zh | text | |
| excerpt_en | text | |
| excerpt_zh | text | |
| content_en | text | Markdown body |
| content_zh | text | Markdown body |
| author | text | |
| date | text | YYYY-MM-DD |
| category | text | announcement, news, story, guide |
| image | text (nullable) | Vercel Blob URL or Unsplash |
| tags | text | JSON array stored as text |
| status | text | `draft` or `published` |
| created_at | text | ISO timestamp |
| updated_at | text | ISO timestamp |

### `events` table
| Column | Type | Notes |
|--------|------|-------|
| id | integer (PK, auto) | |
| slug | text (unique) | |
| title_en | text | |
| title_zh | text | |
| description_en | text | Short description |
| description_zh | text | |
| content_en | text | Markdown body |
| content_zh | text | |
| date | text | YYYY-MM-DD |
| time | text | e.g. "14:00 - 17:00" |
| location_en | text | |
| location_zh | text | |
| category | text | volunteer, cultural, training, community |
| image | text (nullable) | |
| registration_link | text (nullable) | |
| tags | text | JSON array as text |
| status | text | `draft` or `published` |
| created_at | text | ISO timestamp |
| updated_at | text | ISO timestamp |

## Self-Hosting Strategy
- `@libsql/client` supports both `libsql://` (Turso cloud) and `file:./local.db` (local SQLite)
- Single env var `TURSO_DATABASE_URL` controls which mode:
  - Vercel: `libsql://your-db.turso.io` + `TURSO_AUTH_TOKEN`
  - Self-hosted: `file:/path/to/content.db` (no auth token needed)
- To migrate: export DB from Turso dashboard or use `turso db shell` → `.dump`
- Drizzle migrations work identically on both

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| gray-matter parses YAML dates as Date objects | Added `toDateString()` helper in `lib/admin-i18n.ts` |
| Login page rendered inside admin sidebar layout | Added auth check in layout — unauthenticated users get bare layout |

## Resources
- Current admin files: `lib/github.ts`, `lib/admin-actions.ts`, `lib/auth.ts`
- Current content readers: `lib/blog.ts`, `lib/events.ts`, `lib/content.ts`
- Supabase docs: https://supabase.com/docs
- Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres
- Turso (libSQL): https://turso.tech

---
*Update this file after every 2 view/browser/search operations*
