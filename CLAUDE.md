# SILA — Zanzibar Real Estate Website

Marketing + listings website for **SILA Limited**, a Zanzibar-based real estate
**developer and investor**. Presents properties, projects (build-to-own
developments), plots, investment advisory, the team, and lead-capture forms.

Production domain: **https://www.silazanzibar.com**

## Tech stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS 3** (custom brand theme — no shadcn/ui)
- **Framer Motion** (scroll reveals)
- **lucide-react** (icons)
- **Supabase** (`@supabase/supabase-js`) — optional backend; the site runs
  fully without it via static fallback (see **Backend & data** below)
- **tsx** (dev) — runs the TypeScript seed script
- Deployed on **Vercel**

## Commands

```bash
npm run dev      # local dev server
npm run build    # production build (run this to verify changes compile)
npm run start    # serve the production build
npm run db:seed  # seed Supabase from lib/data.ts (needs .env.local)
```

There is no test suite or linter configured; `npm run build` is the verification gate.

## Architecture & where to edit things

### Content flow — `lib/data.ts` (seed/fallback) → `lib/content.ts` (reads)
All listing/marketing content originates in `lib/data.ts`. Pages never import
the listing arrays directly — they call the **async getters in `lib/content.ts`**,
which return live Supabase rows when configured and otherwise fall back to
`lib/data.ts`. Because that same file is the seed source, the site is identical
before and after seeding, then reflects admin edits (see **Backend & data**).

`lib/data.ts` exports:

- `properties`, `developments`, `plots` — listings (with `getProperty`,
  `getDevelopment`, `getPlot`, `featuredProperties` helpers). Note the data key
  is still `developments`, but the **user-facing section is called "Projects"**
  (route `/projects`).
- `team` (`TeamMember[]`) — team members shown on `/team`. Placeholder sample
  names/titles for now; `base` is `"Zanzibar"` or `"Mainland Tanzania"`; optional
  `image` (leave empty to show a branded monogram placeholder until a headshot is
  uploaded).
- Static marketing arrays: `coreServices`, `whyChoose`, `commitments`,
  `buildSteps`, `consultancyServices`, `faqs`, `investmentDisclaimer`.
- `formatPrice(price, currency)` helper.

### Site-wide config — `lib/site.ts`
Business identity, contact details and navigation. Edit here to change globally:

- `site` — name, `legalName` ("SILA Limited"), `url`, `phone`
  (`+255 725 715 250`), `whatsapp`, `email` (`info@silazanzibar.com`),
  `emailAlt` (`silazanzibar@gmail.com`), `address` (`Mpendae, Zanzibar,
  Tanzania`), `hours`, `social`.
- `contactEmails` — array of both emails, rendered in the footer/contact page.
- `telHref` — ready-made `tel:` link.
- `whatsappLink(message?)` — builds `wa.me` links.
- `primaryNav` — header/footer nav (Home, Properties, Projects, Plots,
  Investment Advisory, List Your Property, About Us, Team, Contact).
- `zanzibarLocations` — location filter options.

### Routing (`app/`)
- Static pages: `/`, `/about`, `/team`, `/services`, `/contact`,
  `/investment-advisory`, `/list-your-property`.
- Listing indexes + detail routes: `/properties` + `/properties/[slug]`,
  `/projects` + `/projects/[slug]`, `/plots` + `/plots/[slug]`.
- `/legal/[doc]` — privacy, terms, disclaimer.
- Detail routes use `generateStaticParams` (SSG) from `lib/data.ts`.

### Components
- `components/layout/` — `Header`, `Footer`, `PageHero`.
- `components/home/` — homepage sections.
- `components/property/` — `PropertyCard`, `DevelopmentCard` (used on
  `/projects`), `PlotCard`, `PropertiesBrowser`, `PropertyGallery`.
- `components/team/TeamCard` — team member card with monogram fallback.
- `components/forms/` — `ContactForm`, `EnquiryForm`, `ListPropertyForm`.
- `components/ui/` — `Logo`, `Arch`/`ArchImage` (the ogee-arch brand motif),
  `Reveal` (motion), `WhatsAppFab`, `SectionHeading`.

## Backend & data (Supabase-ready)

The site runs with **no backend** by default. Add Supabase credentials and it
switches to live data + persisted leads with **no code changes**. Full setup
steps live in [`supabase/README.md`](./supabase/README.md).

- **`lib/supabase/env.ts`** — reads env vars; `isSupabaseConfigured` flag.
- **`lib/supabase/server.ts`** — anon client for reads + RLS-guarded inserts
  (server components / actions only). Returns `null` when unconfigured.
- **`lib/supabase/admin.ts`** — service-role client (bypasses RLS) for the seed
  script / trusted server work. Never import into client code.
- **`lib/content.ts`** — async getters (`getProperties`, `getFeaturedProperties`,
  `getPropertyBySlug`, `getProjects`, `getProjectBySlug`, `getPlots`,
  `getPlotBySlug`, `getTeam`). Supabase → static fallback on any error/empty.
- **`app/actions/leads.ts`** — server actions `submitEnquiry` and
  `submitPropertyListing`; persist to Supabase when configured, else log and
  return success so the UX (confirmation + WhatsApp) never breaks.
- **`supabase/schema.sql`** — tables, enums, indexes, RLS (public reads
  `published` content; public write-only inserts to lead tables).
- **`scripts/seed.ts`** (`npm run db:seed`) — upserts placeholder content from
  `lib/data.ts`; loads `.env.local` itself (no dotenv dep).

Env vars (`.env.example` → `.env.local`, also add to Vercel):
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY` (server-only).

**To go live when credentials arrive:** run `supabase/schema.sql` → fill
`.env.local` → `npm run db:seed` → redeploy. Listing pages use ISR
(`revalidate = 300`), so later Table-Editor edits appear within ~5 minutes.

Lead tables: `enquiries` (Contact + Enquiry forms; `source` distinguishes
contact / property_enquiry / project_enquiry / plot_enquiry) and
`property_submissions` (List Your Property — text fields; file uploads are still
UI-only, wire to Supabase Storage when prioritised).

## Brand / design conventions
- Colors (Tailwind theme in `tailwind.config.ts`): `navy` (dominant, brand blue
  `navy-800 #082B5C`), `crimson` (accent red `crimson-600 #C91F2C`), `sand`
  (neutrals), `ink`, `muted`.
- Fonts: `font-display` (Fraunces serif) for headings, `font-sans` (Inter) for
  body. Utility classes: `h-display`, `eyebrow` / `eyebrow-light`, `container-x`,
  `btn-red` / `btn-outline` / `btn-primary` / `btn-ghost-light` / `btn-whatsapp`.
- Easing: `ease-silk`; shadows: `shadow-card` / `shadow-card-hover` / `shadow-float`.
- Contact details come **only** from `lib/site.ts` — never hardcode phone/email.

## SEO
- `app/layout.tsx` — global `metadata` (`metadataBase` = `site.url`), canonical,
  OpenGraph + Twitter cards (OG image `/who-we-are.jpg`), robots directives, and
  **JSON-LD** `RealEstateAgent` structured data (name, phone, email, address,
  areaServed). Per-page `metadata` sets titles/descriptions and `alternates.canonical`.
- `app/sitemap.ts` — generates `/sitemap.xml` from static routes + all listing
  detail pages.
- `app/robots.ts` — generates `/robots.txt` pointing at the sitemap.
- `next.config.mjs` — 301 redirects `/developments(/*)` → `/projects(/*)` (the
  section was renamed from "Developments" to "Projects").

## Notes / gotchas
- The "Developments → Projects" rename changed **routes, labels and copy** only.
  Internal type/data names (`Development`, `developments`) were intentionally kept
  to limit churn. If you add new project links, use `/projects`.
- Team headshots are placeholders (monograms). Real photos plug into
  `TeamMember.image` in `lib/data.ts`.
- `/legal/[doc]` currently supports `privacy`, `terms`, `disclaimer`.
