# Supabase backend — setup & seed

The site runs with **zero backend** by default: all content comes from
`lib/data.ts` and forms show a confirmation + WhatsApp fallback. When Supabase
credentials are present, content is read from the database and form submissions
are persisted — no code changes required.

## One-time setup (when credentials arrive)

1. **Create a Supabase project** at https://supabase.com.

2. **Create the schema.** Two options — either works:

   - **Supabase CLI (recommended)** — the schema is also a migration in
     [`supabase/migrations/`](./migrations). Push it to your project:
     ```bash
     supabase login                       # opens browser, or: SUPABASE_ACCESS_TOKEN=sbp_... 
     supabase link --project-ref <ref>    # <ref> = the xxxx in xxxx.supabase.co
     supabase db push                     # applies supabase/migrations/*.sql
     ```
   - **SQL Editor** — in the Supabase dashboard → SQL Editor, paste and run the
     contents of [`supabase/schema.sql`](./schema.sql).

   Either way this creates the `properties`, `projects`, `plots`,
   `team_members`, `enquiries` and `property_submissions` tables with Row Level
   Security. (`schema.sql` and the migration are kept identical.)

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

5. **Create the admin login.** The `/admin` dashboard (see below) authenticates
   through Supabase Auth. Add `ADMIN_PASSWORD` to `.env.local`, then:
   ```bash
   npm run admin:create
   ```
   This creates (or resets the password of) the `admin@silazanzibar.com` user in
   Supabase Auth. The password lives only in Supabase — it is never committed.
   To disable public sign-ups, in the dashboard set Authentication → Providers →
   Email → "Allow new users to sign up" **off**.

6. **Done.** Restart `npm run dev` (or redeploy). The site now reads from
   Supabase; edit rows in the Supabase Table Editor and changes appear within
   the ISR window (~5 min) or on the next deploy.

## Admin dashboard (`/admin`)

- Sign in at **`/admin/login`** with `admin@silazanzibar.com` and the password
  set via `npm run admin:create`. Only `ADMIN_EMAIL` (default
  `admin@silazanzibar.com`) is allowed in — every other authenticated user is
  rejected.
- The dashboard lists **enquiries** and **List Your Property submissions**, with
  1-hour signed download links for uploaded files. Reads use the service-role
  key on the server, so the lead tables stay private (never exposed to the
  browser or public API).
- Auth is enforced by `proxy.ts` (Next.js 16 middleware) plus a re-check in the
  page. The area is `noindex` and blocked in `robots.txt`.
- **Vercel env vars:** set `ADMIN_EMAIL` (optional) in the project. Do **not**
  set `ADMIN_PASSWORD` in Vercel — it's only used locally by `admin:create`.

## How it fits together

| Concern            | File                                             |
| ------------------ | ------------------------------------------------ |
| Env + config flags | `lib/supabase/env.ts`                            |
| Read/insert client | `lib/supabase/server.ts` (anon, RLS-guarded)     |
| Privileged client  | `lib/supabase/admin.ts` (service role, server)   |
| Auth (admin) client| `lib/supabase/auth-server.ts` (cookie session)   |
| Content getters    | `lib/content.ts` (Supabase → static fallback)    |
| Form persistence   | `app/actions/leads.ts` (server actions)          |
| Admin gate         | `proxy.ts` + `lib/supabase/session.ts`           |
| Admin dashboard    | `app/admin/*`                                    |
| Schema             | `supabase/schema.sql` + `supabase/migrations/`   |
| Seed               | `scripts/seed.ts` (`npm run db:seed`)            |
| Admin user         | `scripts/create-admin.ts` (`npm run admin:create`)|

## Security model (RLS)

- **Content tables** (`properties`, `projects`, `plots`, `team_members`):
  anon can only `SELECT` rows where `published = true`.
- **Lead tables** (`enquiries`, `property_submissions`): anon can only
  `INSERT` (write-only) — the public site can capture leads but cannot read
  anyone else's. Read them from the Supabase dashboard or an authenticated
  admin backend.
- The **service-role key bypasses RLS** and is used only by the seed script and
  trusted server code. Keep it server-side only.

## Storage — property submission media

`supabase/schema.sql` also creates a **private** Storage bucket
`property-submissions` and a policy that lets the public form **upload** (but
not read) files. The `List Your Property` form uploads images/video/documents
straight from the browser and stores their object paths in the
`property_submissions` row (`image_paths`, `video_path`, `document_paths`).

Because the bucket is private, review the files in the Supabase dashboard
(Storage → property-submissions) or generate signed URLs with the service-role
key. When a submission is approved, move/copy the images into a public listing
image location as part of publishing.

## Notes

- `projects` is the DB table for what the code still calls `developments`
  internally (the user-facing section was renamed to "Projects").
