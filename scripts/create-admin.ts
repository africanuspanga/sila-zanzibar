/**
 * Create (or reset the password of) the SILA admin user in Supabase Auth.
 *
 *   1. Fill .env.local with the Supabase credentials (see .env.example) and add:
 *        ADMIN_EMAIL=admin@silazanzibar.com     (optional — this is the default)
 *        ADMIN_PASSWORD=your-admin-password
 *   2. Run:  npm run admin:create
 *
 * The password is read from the environment (gitignored .env.local) and pushed
 * straight into Supabase Auth — it is never written to the repo. Re-running
 * resets the password to whatever ADMIN_PASSWORD currently is. Uses the SERVICE
 * ROLE key; never ship that key to the browser.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";

// --- Minimal .env loader (mirrors scripts/seed.ts) -------------------------
function loadEnv(file: string) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const key = m[1];
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnv(".env.local");
loadEnv(".env");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = (process.env.ADMIN_EMAIL ?? "admin@silazanzibar.com")
  .trim()
  .toLowerCase();
const password = process.env.ADMIN_PASSWORD;

if (!url || !serviceKey) {
  console.error(
    "\n✖ Missing credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local\n"
  );
  process.exit(1);
}
if (!password) {
  console.error(
    "\n✖ Missing ADMIN_PASSWORD. Add it to .env.local, e.g. ADMIN_PASSWORD=your-strong-password\n"
  );
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function findUserByEmail(target: string) {
  // Paginate through Auth users to find the admin (typically page 1).
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await admin.auth.admin.listUsers({
      page,
      perPage: 200,
    });
    if (error) throw error;
    const match = data.users.find(
      (u) => u.email?.toLowerCase() === target
    );
    if (match) return match;
    if (data.users.length < 200) break;
  }
  return null;
}

async function main() {
  const existing = await findUserByEmail(email);

  if (existing) {
    const { error } = await admin.auth.admin.updateUserById(existing.id, {
      password,
      email_confirm: true,
    });
    if (error) {
      console.error(`✖ Could not update admin: ${error.message}`);
      process.exit(1);
    }
    console.log(`✔ Admin password reset for ${email}`);
  } else {
    const { error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error) {
      console.error(`✖ Could not create admin: ${error.message}`);
      process.exit(1);
    }
    console.log(`✔ Admin created: ${email}`);
  }

  console.log("  Sign in at /admin/login");
}

main().catch((err) => {
  console.error(`✖ ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
