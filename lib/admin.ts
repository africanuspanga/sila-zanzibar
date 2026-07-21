// Admin identity for the /admin dashboard.
//
// The admin signs in through Supabase Auth (email + password). Only this email
// is treated as the site administrator — every other authenticated user is
// rejected, so the gate holds even if extra users ever exist in Supabase Auth.
//
// Override the email with the ADMIN_EMAIL env var if it ever changes. The
// PASSWORD is never stored in code — it lives only in Supabase Auth (set it via
// `npm run admin:create`, which reads ADMIN_PASSWORD from your gitignored
// .env.local).

export const ADMIN_EMAIL = (
  process.env.ADMIN_EMAIL ?? "admin@silazanzibar.com"
).trim().toLowerCase();
