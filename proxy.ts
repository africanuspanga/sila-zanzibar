import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/session";

// Next.js 16 proxy (formerly middleware). Only runs for the admin area —
// public marketing pages are untouched. Refreshes the Supabase auth session
// cookie and gates /admin behind the admin login.
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
