// ---------------------------------------------------------------------------
// Content data-access layer.
//
// Every listing page reads through these async getters instead of importing the
// static arrays directly. When Supabase is configured they return live rows;
// otherwise they fall back to the placeholder content in `lib/data.ts`. Because
// that same file is the seed source, the site looks identical before and after
// seeding, then reflects admin edits once the DB is the source of truth.
//
// On any Supabase error (or an empty table) we fall back to the static data so
// the site never renders blank during setup.
// ---------------------------------------------------------------------------

import { getSupabaseServerClient } from "@/lib/supabase/server";
import {
  properties as staticProperties,
  developments as staticDevelopments,
  plots as staticPlots,
  team as staticTeam,
  getProperty as staticGetProperty,
  getDevelopment as staticGetDevelopment,
  getPlot as staticGetPlot,
  type Property,
  type Development,
  type Plot,
  type TeamMember,
} from "@/lib/data";

// ------------------------------ Row mappers ---------------------------------
// DB columns are snake_case; the app's types are camelCase.

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapProperty(r: any): Property {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    location: r.location,
    reference: r.reference,
    listingType: r.listing_type,
    propertyType: r.property_type,
    price: Number(r.price),
    currency: r.currency,
    rentPeriod: r.rent_period ?? undefined,
    bedrooms: r.bedrooms,
    bathrooms: r.bathrooms,
    size: r.size,
    landSize: r.land_size ?? undefined,
    furnished: r.furnished,
    verified: r.verified,
    featured: r.featured,
    beachfront: r.beachfront,
    newDevelopment: r.new_development,
    image: r.image,
    gallery: r.gallery ?? [],
    shortDescription: r.short_description,
    description: r.description,
    amenities: r.amenities ?? [],
    coords: { lat: Number(r.lat), lng: Number(r.lng) },
  };
}

function mapDevelopment(r: any): Development {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    location: r.location,
    status: r.status,
    completionPercent: Number(r.completion_percent),
    estCompletion: r.est_completion,
    startingPrice: Number(r.starting_price),
    currency: r.currency,
    unitTypes: r.unit_types ?? [],
    image: r.image,
    gallery: r.gallery ?? [],
    shortDescription: r.short_description,
    description: r.description,
    amenities: r.amenities ?? [],
    paymentPlan: r.payment_plan,
  };
}

function mapPlot(r: any): Plot {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    location: r.location,
    size: Number(r.size),
    price: Number(r.price),
    currency: r.currency,
    pricePerSqm: r.price_per_sqm ?? undefined,
    use: r.use,
    roadAccess: r.road_access,
    electricity: r.electricity,
    water: r.water,
    docStatus: r.doc_status,
    distanceFromRoad: r.distance_from_road,
    distanceFromBeach: r.distance_from_beach ?? undefined,
    image: r.image,
    description: r.description,
    coords: { lat: Number(r.lat), lng: Number(r.lng) },
  };
}

function mapTeamMember(r: any): TeamMember {
  return {
    id: r.id,
    name: r.name,
    title: r.title,
    base: r.base,
    image: r.image ?? undefined,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// ------------------------------- Properties ---------------------------------

export async function getProperties(): Promise<Property[]> {
  const db = getSupabaseServerClient();
  if (!db) return staticProperties;
  const { data, error } = await db
    .from("properties")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) {
    console.error("[content] getProperties:", error.message);
    return staticProperties;
  }
  if (!data || data.length === 0) return staticProperties;
  return data.map(mapProperty);
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const db = getSupabaseServerClient();
  if (!db) return staticProperties.filter((p) => p.featured);
  const { data, error } = await db
    .from("properties")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("[content] getFeaturedProperties:", error.message);
    return staticProperties.filter((p) => p.featured);
  }
  if (!data || data.length === 0) return staticProperties.filter((p) => p.featured);
  return data.map(mapProperty);
}

export async function getPropertyBySlug(slug: string): Promise<Property | undefined> {
  const db = getSupabaseServerClient();
  if (!db) return staticGetProperty(slug);
  const { data, error } = await db
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) {
    console.error("[content] getPropertyBySlug:", error.message);
    return staticGetProperty(slug);
  }
  return data ? mapProperty(data) : staticGetProperty(slug);
}

// -------------------------------- Projects ----------------------------------

export async function getProjects(): Promise<Development[]> {
  const db = getSupabaseServerClient();
  if (!db) return staticDevelopments;
  const { data, error } = await db
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) {
    console.error("[content] getProjects:", error.message);
    return staticDevelopments;
  }
  if (!data || data.length === 0) return staticDevelopments;
  return data.map(mapDevelopment);
}

export async function getProjectBySlug(slug: string): Promise<Development | undefined> {
  const db = getSupabaseServerClient();
  if (!db) return staticGetDevelopment(slug);
  const { data, error } = await db
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) {
    console.error("[content] getProjectBySlug:", error.message);
    return staticGetDevelopment(slug);
  }
  return data ? mapDevelopment(data) : staticGetDevelopment(slug);
}

// --------------------------------- Plots ------------------------------------

export async function getPlots(): Promise<Plot[]> {
  const db = getSupabaseServerClient();
  if (!db) return staticPlots;
  const { data, error } = await db
    .from("plots")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) {
    console.error("[content] getPlots:", error.message);
    return staticPlots;
  }
  if (!data || data.length === 0) return staticPlots;
  return data.map(mapPlot);
}

export async function getPlotBySlug(slug: string): Promise<Plot | undefined> {
  const db = getSupabaseServerClient();
  if (!db) return staticGetPlot(slug);
  const { data, error } = await db
    .from("plots")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) {
    console.error("[content] getPlotBySlug:", error.message);
    return staticGetPlot(slug);
  }
  return data ? mapPlot(data) : staticGetPlot(slug);
}

// --------------------------------- Team -------------------------------------

export async function getTeam(): Promise<TeamMember[]> {
  const db = getSupabaseServerClient();
  if (!db) return staticTeam;
  const { data, error } = await db
    .from("team_members")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) {
    console.error("[content] getTeam:", error.message);
    return staticTeam;
  }
  if (!data || data.length === 0) return staticTeam;
  return data.map(mapTeamMember);
}
