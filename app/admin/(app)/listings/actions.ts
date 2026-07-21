"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { LISTING_IMAGES_BUCKET } from "@/lib/supabase/client";
import { isAdmin } from "@/lib/admin/guard";
import { KIND_TABLE, KIND_PUBLIC_PATH, type ListingKind } from "@/lib/admin/listings";

export type ActionResult = { ok?: boolean; error?: string; slug?: string };

function num(v: unknown, def: number | null = null): number | null {
  if (v === "" || v === null || v === undefined) return def;
  const n = Number(v);
  return Number.isNaN(n) ? def : n;
}

function cleanSlug(v: string): string {
  return v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function revalidate(kind: ListingKind, slug?: string) {
  revalidatePath("/");
  revalidatePath(KIND_PUBLIC_PATH[kind]);
  if (slug) revalidatePath(`${KIND_PUBLIC_PATH[kind]}/${slug}`);
  revalidatePath("/admin/listings");
  revalidatePath("/admin");
}

// --- Image uploads ---------------------------------------------------------
// Generates a short-lived signed upload URL (service role, admin-guarded). The
// browser uploads the file directly to it, then stores the returned public URL.
export async function createListingImageUploadUrl(
  kind: string,
  filename: string
): Promise<{ path?: string; token?: string; publicUrl?: string; error?: string }> {
  if (!(await isAdmin())) return { error: "Not authorised" };
  try {
    const admin = getSupabaseAdminClient();
    const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
    const path = `${kind}/${crypto.randomUUID()}-${safe}`;
    const { data, error } = await admin.storage.from(LISTING_IMAGES_BUCKET).createSignedUploadUrl(path);
    if (error || !data) return { error: error?.message ?? "Could not create upload URL" };
    const publicUrl = admin.storage.from(LISTING_IMAGES_BUCKET).getPublicUrl(data.path).data.publicUrl;
    return { path: data.path, token: data.token, publicUrl };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Upload URL failed" };
  }
}

// --- Property --------------------------------------------------------------
export type PropertyInput = {
  id?: string;
  slug: string;
  title: string;
  location: string;
  reference?: string;
  listing_type: string;
  property_type: string;
  price: number | string;
  currency: string;
  rent_period?: string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  size?: number | string;
  land_size?: number | string;
  furnished: string;
  verified: boolean;
  featured: boolean;
  beachfront: boolean;
  new_development: boolean;
  image?: string;
  gallery: string[];
  short_description?: string;
  description?: string;
  amenities: string[];
  lat?: number | string;
  lng?: number | string;
  published: boolean;
  sort_order?: number | string;
};

export async function saveProperty(input: PropertyInput): Promise<ActionResult> {
  if (!(await isAdmin())) return { error: "Not authorised" };
  const slug = cleanSlug(input.slug || input.title);
  if (!slug || !input.title?.trim()) return { error: "Title and slug are required" };
  const record = {
    slug,
    title: input.title.trim(),
    location: input.location?.trim() || "",
    reference: input.reference?.trim() || null,
    listing_type: input.listing_type || "sale",
    property_type: input.property_type?.trim() || "Property",
    price: num(input.price, 0),
    currency: input.currency || "USD",
    rent_period: input.rent_period || null,
    bedrooms: num(input.bedrooms),
    bathrooms: num(input.bathrooms),
    size: num(input.size),
    land_size: num(input.land_size),
    furnished: input.furnished || "Optional",
    verified: !!input.verified,
    featured: !!input.featured,
    beachfront: !!input.beachfront,
    new_development: !!input.new_development,
    image: input.image || null,
    gallery: input.gallery ?? [],
    short_description: input.short_description?.trim() || null,
    description: input.description?.trim() || null,
    amenities: input.amenities ?? [],
    lat: num(input.lat),
    lng: num(input.lng),
    published: !!input.published,
    sort_order: num(input.sort_order, 0),
  };
  try {
    const admin = getSupabaseAdminClient();
    const res = input.id
      ? await admin.from("properties").update(record).eq("id", input.id)
      : await admin.from("properties").insert(record);
    if (res.error) return { error: res.error.message };
    revalidate("property", slug);
    return { ok: true, slug };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Save failed" };
  }
}

// --- Project ---------------------------------------------------------------
export type ProjectInput = {
  id?: string;
  slug: string;
  name: string;
  location: string;
  status: string;
  completion_percent?: number | string;
  est_completion?: string;
  starting_price: number | string;
  currency: string;
  unit_types: string[];
  image?: string;
  gallery: string[];
  short_description?: string;
  description?: string;
  amenities: string[];
  payment_plan?: string;
  published: boolean;
  sort_order?: number | string;
};

export async function saveProject(input: ProjectInput): Promise<ActionResult> {
  if (!(await isAdmin())) return { error: "Not authorised" };
  const slug = cleanSlug(input.slug || input.name);
  if (!slug || !input.name?.trim()) return { error: "Name and slug are required" };
  const record = {
    slug,
    name: input.name.trim(),
    location: input.location?.trim() || "",
    status: input.status || "Planning",
    completion_percent: num(input.completion_percent, 0),
    est_completion: input.est_completion?.trim() || null,
    starting_price: num(input.starting_price, 0),
    currency: input.currency || "USD",
    unit_types: input.unit_types ?? [],
    image: input.image || null,
    gallery: input.gallery ?? [],
    short_description: input.short_description?.trim() || null,
    description: input.description?.trim() || null,
    amenities: input.amenities ?? [],
    payment_plan: input.payment_plan?.trim() || null,
    published: !!input.published,
    sort_order: num(input.sort_order, 0),
  };
  try {
    const admin = getSupabaseAdminClient();
    const res = input.id
      ? await admin.from("projects").update(record).eq("id", input.id)
      : await admin.from("projects").insert(record);
    if (res.error) return { error: res.error.message };
    revalidate("project", slug);
    return { ok: true, slug };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Save failed" };
  }
}

// --- Plot ------------------------------------------------------------------
export type PlotInput = {
  id?: string;
  slug: string;
  title: string;
  location: string;
  size: number | string;
  price: number | string;
  currency: string;
  price_per_sqm?: number | string;
  use?: string;
  road_access: boolean;
  electricity: boolean;
  water: boolean;
  doc_status?: string;
  distance_from_road?: string;
  distance_from_beach?: string;
  image?: string;
  description?: string;
  lat?: number | string;
  lng?: number | string;
  published: boolean;
  sort_order?: number | string;
};

export async function savePlot(input: PlotInput): Promise<ActionResult> {
  if (!(await isAdmin())) return { error: "Not authorised" };
  const slug = cleanSlug(input.slug || input.title);
  if (!slug || !input.title?.trim()) return { error: "Title and slug are required" };
  const record = {
    slug,
    title: input.title.trim(),
    location: input.location?.trim() || "",
    size: num(input.size, 0),
    price: num(input.price, 0),
    currency: input.currency || "USD",
    price_per_sqm: num(input.price_per_sqm),
    use: input.use?.trim() || null,
    road_access: !!input.road_access,
    electricity: !!input.electricity,
    water: !!input.water,
    doc_status: input.doc_status?.trim() || null,
    distance_from_road: input.distance_from_road?.trim() || null,
    distance_from_beach: input.distance_from_beach?.trim() || null,
    image: input.image || null,
    description: input.description?.trim() || null,
    lat: num(input.lat),
    lng: num(input.lng),
    published: !!input.published,
    sort_order: num(input.sort_order, 0),
  };
  try {
    const admin = getSupabaseAdminClient();
    const res = input.id
      ? await admin.from("plots").update(record).eq("id", input.id)
      : await admin.from("plots").insert(record);
    if (res.error) return { error: res.error.message };
    revalidate("plot", slug);
    return { ok: true, slug };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Save failed" };
  }
}

// --- Delete ----------------------------------------------------------------
export async function deleteListing(kind: ListingKind, id: string): Promise<ActionResult> {
  if (!(await isAdmin())) return { error: "Not authorised" };
  try {
    const admin = getSupabaseAdminClient();
    const { error } = await admin.from(KIND_TABLE[kind]).delete().eq("id", id);
    if (error) return { error: error.message };
    revalidate(kind);
    return { ok: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Delete failed" };
  }
}

export async function togglePublished(kind: ListingKind, id: string, published: boolean): Promise<ActionResult> {
  if (!(await isAdmin())) return { error: "Not authorised" };
  try {
    const admin = getSupabaseAdminClient();
    const { error } = await admin.from(KIND_TABLE[kind]).update({ published }).eq("id", id);
    if (error) return { error: error.message };
    revalidate(kind);
    return { ok: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Update failed" };
  }
}
