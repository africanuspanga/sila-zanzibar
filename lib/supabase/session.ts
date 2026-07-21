import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured, supabaseUrl, supabaseAnonKey } from "./env";
import { ADMIN_EMAIL } from "@/lib/admin";

// Refreshes the Supabase auth session cookie and guards the /admin area.
// Only ADMIN_EMAIL (via Supabase Auth) may reach the dashboard; everyone else
// is bounced to /admin/login. Runs from the root middleware.ts.

export async function updateSession(request: NextRequest): Promise<NextResponse> {
  let response = NextResponse.next({ request });

  const path = request.nextUrl.pathname;
  const isLoginRoute = path === "/admin/login";
  const isProtected = path.startsWith("/admin") && !isLoginRoute;

  let email: string | undefined;

  if (isSupabaseConfigured) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    // getUser() revalidates the token with Supabase — do not trust getSession here.
    const {
      data: { user },
    } = await supabase.auth.getUser();
    email = user?.email?.toLowerCase();
  }

  const isAdmin = !!email && email === ADMIN_EMAIL;

  if (isProtected && !isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = path === "/admin" ? "" : `?redirect=${encodeURIComponent(path)}`;
    return NextResponse.redirect(url);
  }

  if (isLoginRoute && isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}
