/**
 * Seed the Supabase database with the placeholder content from lib/data.ts.
 *
 *   1. Create the schema first:  run supabase/schema.sql in the Supabase SQL editor
 *   2. Put credentials in .env.local (see .env.example)
 *   3. Run:  npm run db:seed
 *
 * Idempotent: content tables upsert on `slug`; team_members is replaced.
 * Uses the SERVICE ROLE key (bypasses RLS) — never ship this key to the browser.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import {
  properties,
  developments,
  plots,
  team,
} from "../lib/data";

// --- Minimal .env loader (no dotenv dependency) ----------------------------
function loadEnv(file: string) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const key = m[1];
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnv(".env.local");
loadEnv(".env");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "\n✖ Missing credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local\n"
  );
  process.exit(1);
}

const db: SupabaseClient = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function upsert(table: string, rows: Record<string, unknown>[]) {
  const { error } = await db.from(table).upsert(rows, { onConflict: "slug" });
  if (error) {
    console.error(`✖ ${table}: ${error.message}`);
    process.exit(1);
  }
  console.log(`✓ ${table}: ${rows.length} rows upserted`);
}

async function main() {
  console.log(`\nSeeding ${url}\n`);

  await upsert(
    "properties",
    properties.map((p, i) => ({
      slug: p.slug,
      title: p.title,
      location: p.location,
      reference: p.reference,
      listing_type: p.listingType,
      property_type: p.propertyType,
      price: p.price,
      currency: p.currency,
      rent_period: p.rentPeriod ?? null,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      size: p.size,
      land_size: p.landSize ?? null,
      furnished: p.furnished,
      verified: p.verified,
      featured: p.featured,
      beachfront: p.beachfront,
      new_development: p.newDevelopment,
      image: p.image,
      gallery: p.gallery,
      short_description: p.shortDescription,
      description: p.description,
      amenities: p.amenities,
      lat: p.coords.lat,
      lng: p.coords.lng,
      published: true,
      sort_order: i,
    }))
  );

  await upsert(
    "projects",
    developments.map((d, i) => ({
      slug: d.slug,
      name: d.name,
      location: d.location,
      status: d.status,
      completion_percent: d.completionPercent,
      est_completion: d.estCompletion,
      starting_price: d.startingPrice,
      currency: d.currency,
      unit_types: d.unitTypes,
      image: d.image,
      gallery: d.gallery,
      short_description: d.shortDescription,
      description: d.description,
      amenities: d.amenities,
      payment_plan: d.paymentPlan,
      published: true,
      sort_order: i,
    }))
  );

  await upsert(
    "plots",
    plots.map((pl, i) => ({
      slug: pl.slug,
      title: pl.title,
      location: pl.location,
      size: pl.size,
      price: pl.price,
      currency: pl.currency,
      price_per_sqm: pl.pricePerSqm ?? null,
      use: pl.use,
      road_access: pl.roadAccess,
      electricity: pl.electricity,
      water: pl.water,
      doc_status: pl.docStatus,
      distance_from_road: pl.distanceFromRoad,
      distance_from_beach: pl.distanceFromBeach ?? null,
      image: pl.image,
      description: pl.description,
      lat: pl.coords.lat,
      lng: pl.coords.lng,
      published: true,
      sort_order: i,
    }))
  );

  // team_members has no natural slug — replace the set each run.
  const del = await db.from("team_members").delete().not("id", "is", null);
  if (del.error) {
    console.error(`✖ team_members (clear): ${del.error.message}`);
    process.exit(1);
  }
  const insTeam = await db.from("team_members").insert(
    team.map((m, i) => ({
      name: m.name,
      title: m.title,
      base: m.base,
      image: m.image ?? null,
      published: true,
      sort_order: i,
    }))
  );
  if (insTeam.error) {
    console.error(`✖ team_members: ${insTeam.error.message}`);
    process.exit(1);
  }
  console.log(`✓ team_members: ${team.length} rows inserted`);

  console.log("\n✔ Seed complete.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
