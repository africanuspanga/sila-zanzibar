// Supabase environment configuration.
//
// Reads env vars and exposes `isSupabaseConfigured` so the rest of the app can
// gracefully fall back to the static content in `lib/data.ts` until real
// credentials are provided. Nothing here throws at import time.

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
// Server-only. Never expose to the client — no NEXT_PUBLIC_ prefix.
export const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

// True once the public URL + anon key are present (reads + RLS-guarded inserts).
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// True once the service-role key is present (seeding / privileged server work).
export const isSupabaseAdminConfigured = Boolean(
  supabaseUrl && supabaseServiceRoleKey
);
