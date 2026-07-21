// Admin-side listing reads — service role, so unpublished rows are included too
// (the public content getters filter published = true).

import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/supabase/env";

export type ListingKind = "property" | "project" | "plot";

export const KIND_TABLE: Record<ListingKind, string> = {
  property: "properties",
  project: "projects",
  plot: "plots",
};

export const KIND_LABEL: Record<ListingKind, string> = {
  property: "Property",
  project: "Project",
  plot: "Plot",
};

export const KIND_PUBLIC_PATH: Record<ListingKind, string> = {
  property: "/properties",
  project: "/projects",
  plot: "/plots",
};

export interface PropertyRow {
  id: string;
  slug: string;
  title: string;
  location: string;
  reference: string | null;
  listing_type: string;
  property_type: string;
  price: number;
  currency: string;
  rent_period: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  size: number | null;
  land_size: number | null;
  furnished: string;
  verified: boolean;
  featured: boolean;
  beachfront: boolean;
  new_development: boolean;
  image: string | null;
  gallery: string[] | null;
  short_description: string | null;
  description: string | null;
  amenities: string[] | null;
  lat: number | null;
  lng: number | null;
  published: boolean;
  sort_order: number;
  created_at: string;
}

export interface ProjectRow {
  id: string;
  slug: string;
  name: string;
  location: string;
  status: string;
  completion_percent: number;
  est_completion: string | null;
  starting_price: number;
  currency: string;
  unit_types: string[] | null;
  image: string | null;
  gallery: string[] | null;
  short_description: string | null;
  description: string | null;
  amenities: string[] | null;
  payment_plan: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
}

export interface PlotRow {
  id: string;
  slug: string;
  title: string;
  location: string;
  size: number;
  price: number;
  currency: string;
  price_per_sqm: number | null;
  use: string | null;
  road_access: boolean;
  electricity: boolean;
  water: boolean;
  doc_status: string | null;
  distance_from_road: string | null;
  distance_from_beach: string | null;
  image: string | null;
  description: string | null;
  lat: number | null;
  lng: number | null;
  published: boolean;
  sort_order: number;
  created_at: string;
}

export async function listAll<T = Record<string, unknown>>(kind: ListingKind): Promise<T[]> {
  if (!isSupabaseAdminConfigured) return [];
  try {
    const admin = getSupabaseAdminClient();
    const { data } = await admin
      .from(KIND_TABLE[kind])
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    return (data ?? []) as T[];
  } catch {
    return [];
  }
}

export async function getOne<T = Record<string, unknown>>(kind: ListingKind, id: string): Promise<T | null> {
  if (!isSupabaseAdminConfigured) return null;
  try {
    const admin = getSupabaseAdminClient();
    const { data } = await admin.from(KIND_TABLE[kind]).select("*").eq("id", id).maybeSingle();
    return (data as T) ?? null;
  } catch {
    return null;
  }
}
