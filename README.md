# SILA Real Estate

A premium marketing website for **SILA Real Estate** — a Zanzibar property partner
combining property sales, rentals, build-to-own developments, plot sales and
professional land-investment guidance in one trusted company.

> **Tagline:** Property. Investment. Possibility.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion**.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

---

## Design language

- **Navy `#082B5C`** is dominant (headings, nav, buttons, footer); **red `#C91F2C`**
  is a highlight accent only (CTAs, labels, active states) — as specified in the brief.
- **Zanzibari ogee arch** (from the SILA favicon) is the signature motif — used to
  frame imagery (`ArchImage`) and as a quiet decorative outline (`ArchOutline`).
- Type: **Fraunces** (editorial serif display) + **Inter** (UI/body).
- Fewer rounded corners than the reference template, navy section backgrounds, and
  original Zanzibar photography — a more premium, investment-focused identity.

---

## Project structure

```
app/
  layout.tsx                 Root layout: fonts, header, footer, WhatsApp FAB, SEO
  page.tsx                   Homepage (all brief sections)
  properties/                Listing (filters/sort/views) + [slug] detail
  developments/              Build-to-Own listing + [slug] detail (progress, payment plan)
  plots/                     Plot listing + [slug] detail (utilities, documentation)
  investment-advisory/       Consultancy services + booking + legal disclaimer
  list-your-property/        Owner submission form (consent, media uploads)
  about/  services/  contact/ Marketing pages
  legal/[doc]/               privacy · terms · disclaimer
  not-found.tsx              Branded 404
components/
  layout/                    Header, Footer, PageHero
  home/                      Homepage section components
  property/                  PropertyCard, PlotCard, DevelopmentCard, gallery, browser
  forms/                     EnquiryForm, ContactForm, ListPropertyForm
  ui/                        Arch, Logo, Reveal, SectionHeading, WhatsAppFab
lib/
  data.ts                    ★ Typed content layer (properties, developments, plots, FAQ…)
  site.ts                    Company details, nav, locations, WhatsApp helper
  cn.ts                      className helper
public/                      Brand assets + Zanzibar photography + hero video
```

---

## The content layer (`lib/data.ts`)

All properties, developments, plots and marketing copy live in **one typed module**.
Every page imports from here, so this is the single seam where a real backend /
admin dashboard plugs in later — swap the exported arrays for DB queries and nothing
else changes.

The current listings are **illustrative example inventory** (the brief's example
titles + real Zanzibar locations, mapped to the supplied photography). Per the brief,
no fabricated data is presented as verified fact: prices are illustrative, testimonials
show an honest empty state, and the footer carries a disclaimer.

---

## Forms

`EnquiryForm`, `ContactForm` and `ListPropertyForm` currently confirm on submit and
route to WhatsApp so no lead is lost. Wire them to a Server Action / API route (and the
admin lead pipeline) when the backend is ready — the components are the only thing to touch.

---

## Roadmap — Phase 2 (admin & backend)

The brief specifies a full admin system. Recommended next steps:

1. **Database + auth** — e.g. Vercel Postgres/Neon + an auth provider.
2. **Admin dashboard** — property / development / plot CRUD, media uploads, featured &
   verified flags, draft/publish, owner-submission review, and a lead pipeline
   (New → Contacted → Qualified → Viewing → Negotiating → Reserved → Completed / Lost).
3. **Content management** — homepage, About, services, FAQs, testimonials (verified
   toggle), team, locations, contact details.
4. **Live map** — replace the illustrative `MapPreview` with clustered Google/Mapbox
   markers once an API key is configured.

## Production notes

- **Confirm the placeholders in `lib/site.ts`** (phone, WhatsApp number, email, address).
- **Compress `public/hero-bg.mp4`** (currently ~23 MB) to ~2–4 MB and consider a poster-only
  fallback on mobile to protect load time and data usage.
- Replace example listings and enable real testimonials via the admin before launch.
