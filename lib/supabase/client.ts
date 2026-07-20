import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabaseUrl, supabaseAnonKey } from "./env";

// Browser Supabase client (public anon key). Used from "use client" components
// for direct-to-Storage file uploads. Returns null when Supabase is not yet
// configured so callers can skip uploads gracefully. Only NEXT_PUBLIC_* env
// vars are referenced, so no secret is exposed to the browser.

let cached: SupabaseClient | null | undefined;

export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  if (!isSupabaseConfigured) {
    cached = null;
    return null;
  }
  cached = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export const PROPERTY_SUBMISSIONS_BUCKET = "property-submissions";
