# Supabase backend — setup & seed

The site runs with **zero backend** by default: all content comes from
`lib/data.ts` and forms show a confirmation + WhatsApp fallback. When Supabase
credentials are present, content is read from the database and form submissions
are persisted — no code changes required.

## One-time setup (when credentials arrive)

1. **Create a Supabase project** at https://supabase.com.

2. **Create the schema.** In the Supabase dashboard → SQL Editor, paste and run
   the contents of [`supabase/schema.sql`](./schema.sql). This creates the
   `properties`, `projects`, `plots`, `team_members`, `enquiries` and
   `property_submissions` tables with Row Level Security.

3. **Add credentials.** Copy `.env.example` → `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (Project Settings → API → service_role)

   Also add all three to the Vercel project (Settings → Environment Variables)
   for production.

4. **Seed the placeholder content:**
   ```bash
   npm run db:seed
   ```
   This upserts every property / project / plot and replaces the team list from
   `lib/data.ts`. Safe to re-run.

5. **Done.** Restart `npm run dev` (or redeploy). The site now reads from
   Supabase; edit rows in the Supabase Table Editor and changes appear within
   the ISR window (~5 min) or on the next deploy.

## How it fits together

| Concern            | File                                             |
| ------------------ | ------------------------------------------------ |
| Env + config flags | `lib/supabase/env.ts`                            |
| Read/insert client | `lib/supabase/server.ts` (anon, RLS-guarded)     |
| Privileged client  | `lib/supabase/admin.ts` (service role, server)   |
| Content getters    | `lib/content.ts` (Supabase → static fallback)    |
| Form persistence   | `app/actions/leads.ts` (server actions)          |
| Schema             | `supabase/schema.sql`                            |
| Seed               | `scripts/seed.ts` (`npm run db:seed`)            |

## Security model (RLS)

- **Content tables** (`properties`, `projects`, `plots`, `team_members`):
  anon can only `SELECT` rows where `published = true`.
- **Lead tables** (`enquiries`, `property_submissions`): anon can only
  `INSERT` (write-only) — the public site can capture leads but cannot read
  anyone else's. Read them from the Supabase dashboard or an authenticated
  admin backend.
- The **service-role key bypasses RLS** and is used only by the seed script and
  trusted server code. Keep it server-side only.

## Notes

- The `List Your Property` form persists its text fields to
  `property_submissions`. File uploads (images/video/docs) are still UI-only —
  wire them to a Supabase Storage bucket when that flow is prioritised.
- `projects` is the DB table for what the code still calls `developments`
  internally (the user-facing section was renamed to "Projects").
