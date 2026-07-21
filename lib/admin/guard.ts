import { getSupabaseAuthClient } from "@/lib/supabase/auth-server";
import { ADMIN_EMAIL } from "@/lib/admin";

// True only for a valid Supabase Auth session whose email is the admin.
// Every admin server action / route handler must call this before mutating —
// server actions are publicly invocable, so the proxy gate is not enough.
export async function isAdmin(): Promise<boolean> {
  const auth = await getSupabaseAuthClient();
  if (!auth) return false;
  const {
    data: { user },
  } = await auth.auth.getUser();
  return !!user && user.email?.toLowerCase() === ADMIN_EMAIL;
}
