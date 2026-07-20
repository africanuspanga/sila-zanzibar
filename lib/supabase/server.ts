import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabaseUrl, supabaseAnonKey } from "./env";

// Server-side Supabase client using the public anon key. Safe for reads and for
// RLS-guarded inserts (form submissions). Returns null when Supabase is not yet
// configured so callers can fall back to static content.
//
// Do NOT import this into "use client" components — use it in server
// components, route handlers and server actions only.

let cached: SupabaseClient | null | undefined;

export function getSupabaseServerClient(): SupabaseClient | null {
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
