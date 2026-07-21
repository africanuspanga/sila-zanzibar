"use server";

import { redirect } from "next/navigation";
import { getSupabaseAuthClient } from "@/lib/supabase/auth-server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { ADMIN_EMAIL } from "@/lib/admin";

export type SignInState = { error?: string };

// Signs the admin in via Supabase Auth. Only ADMIN_EMAIL is accepted; the
// password is validated by Supabase (never stored in this codebase).
export async function signInAdmin(
  _prev: SignInState,
  formData: FormData
): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirect") ?? "/admin") || "/admin";

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }
  if (email !== ADMIN_EMAIL) {
    return { error: "This account is not authorised." };
  }
  if (!isSupabaseConfigured) {
    return {
      error:
        "The backend isn't configured yet. Add the Supabase credentials to .env.local and redeploy.",
    };
  }

  const supabase = await getSupabaseAuthClient();
  if (!supabase) {
    return { error: "The backend isn't configured yet." };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: "Incorrect email or password." };
  }

  // Only redirect within the admin area — never to an attacker-supplied URL.
  redirect(redirectTo.startsWith("/admin") ? redirectTo : "/admin");
}

export async function signOutAdmin(): Promise<void> {
  const supabase = await getSupabaseAuthClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}
