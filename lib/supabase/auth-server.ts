import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabaseUrl, supabaseAnonKey } from "./env";

// Cookie-aware Supabase client for the App Router. Reads/writes the auth session
// via Next's cookie store, so Server Components, Route Handlers and Server
// Actions all share the same signed-in session. Returns null until Supabase is
// configured. Do NOT import this into "use client" components.

export async function getSupabaseAuthClient(): Promise<SupabaseClient | null> {
  if (!isSupabaseConfigured) return null;

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // `set` throws when called from a Server Component render. That's
          // fine — the middleware refreshes the session cookie on each request.
        }
      },
    },
  });
}
