"use server";

// Server actions for lead capture. When Supabase is configured, submissions are
// persisted; otherwise they are logged and treated as successful so the public
// UX (confirmation + WhatsApp fallback) is never blocked during setup.

import { getSupabaseServerClient } from "@/lib/supabase/server";

export type LeadResult = { ok: boolean; error?: string };

export type EnquiryInput = {
  name: string;
  phone?: string;
  email?: string;
  country?: string;
  service?: string;
  location?: string;
  budget?: string;
  currency?: string;
  preferredDate?: string;
  preferredContact?: string;
  message?: string;
  context?: string;
  // contact | enquiry | property_enquiry | project_enquiry
  source?: string;
};

export async function submitEnquiry(input: EnquiryInput): Promise<LeadResult> {
  const record = {
    name: input.name?.trim() || "Unknown",
    phone: input.phone || null,
    email: input.email || null,
    country: input.country || null,
    service: input.service || null,
    location: input.location || null,
    budget: input.budget || null,
    currency: input.currency || null,
    preferred_date: input.preferredDate || null,
    preferred_contact: input.preferredContact || null,
    message: input.message || null,
    context: input.context || null,
    source: input.source || "enquiry",
  };

  const db = getSupabaseServerClient();
  if (!db) {
    console.info("[lead] Supabase not configured — enquiry not persisted:", record);
    return { ok: true };
  }

  const { error } = await db.from("enquiries").insert(record);
  if (error) {
    console.error("[lead] enquiry insert failed:", error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export type ListingInput = {
  ownerName: string;
  ownerPhone?: string;
  ownerWhatsapp?: string;
  ownerEmail?: string;
  propertyTitle?: string;
  propertyType?: string;
  listingType?: string;
  location?: string;
  price?: string;
  currency?: string;
  bedrooms?: string;
  bathrooms?: string;
  size?: string;
  landSize?: string;
  furnished?: string;
  mapsLink?: string;
  description?: string;
  preferredContact?: string;
  // Storage object paths in the property-submissions bucket.
  imagePaths?: string[];
  videoPath?: string;
  documentPaths?: string[];
};

export async function submitPropertyListing(input: ListingInput): Promise<LeadResult> {
  const record = {
    owner_name: input.ownerName?.trim() || "Unknown",
    owner_phone: input.ownerPhone || null,
    owner_whatsapp: input.ownerWhatsapp || null,
    owner_email: input.ownerEmail || null,
    property_title: input.propertyTitle || null,
    property_type: input.propertyType || null,
    listing_type: input.listingType || null,
    location: input.location || null,
    price: input.price || null,
    currency: input.currency || null,
    bedrooms: input.bedrooms || null,
    bathrooms: input.bathrooms || null,
    size: input.size || null,
    land_size: input.landSize || null,
    furnished: input.furnished || null,
    maps_link: input.mapsLink || null,
    description: input.description || null,
    preferred_contact: input.preferredContact || null,
    image_paths: input.imagePaths ?? [],
    video_path: input.videoPath || null,
    document_paths: input.documentPaths ?? [],
  };

  const db = getSupabaseServerClient();
  if (!db) {
    console.info("[lead] Supabase not configured — listing not persisted:", record);
    return { ok: true };
  }

  const { error } = await db.from("property_submissions").insert(record);
  if (error) {
    console.error("[lead] property submission insert failed:", error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
