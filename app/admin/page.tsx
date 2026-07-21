import { redirect } from "next/navigation";
import { getSupabaseAuthClient } from "@/lib/supabase/auth-server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { PROPERTY_SUBMISSIONS_BUCKET } from "@/lib/supabase/client";
import { isSupabaseAdminConfigured } from "@/lib/supabase/env";
import { ADMIN_EMAIL } from "@/lib/admin";
import { signOutAdmin } from "./actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Enquiry = {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  country: string | null;
  service: string | null;
  location: string | null;
  budget: string | null;
  currency: string | null;
  preferred_date: string | null;
  preferred_contact: string | null;
  message: string | null;
  context: string | null;
  source: string | null;
  status: string | null;
  created_at: string;
};

type Submission = {
  id: string;
  owner_name: string | null;
  owner_phone: string | null;
  owner_whatsapp: string | null;
  owner_email: string | null;
  property_title: string | null;
  property_type: string | null;
  listing_type: string | null;
  location: string | null;
  price: string | null;
  currency: string | null;
  bedrooms: string | null;
  bathrooms: string | null;
  size: string | null;
  land_size: string | null;
  furnished: string | null;
  maps_link: string | null;
  description: string | null;
  preferred_contact: string | null;
  image_paths: string[] | null;
  video_path: string | null;
  document_paths: string[] | null;
  status: string | null;
  created_at: string;
};

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

async function signPaths(
  admin: ReturnType<typeof getSupabaseAdminClient>,
  paths: string[]
): Promise<{ path: string; url: string }[]> {
  const clean = paths.filter(Boolean);
  if (clean.length === 0) return [];
  const { data } = await admin.storage
    .from(PROPERTY_SUBMISSIONS_BUCKET)
    .createSignedUrls(clean, 60 * 60); // 1-hour links
  return (data ?? [])
    .filter((d) => d.signedUrl)
    .map((d) => ({ path: d.path ?? "", url: d.signedUrl as string }));
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <p className="text-sm">
      <span className="text-muted">{label}: </span>
      <span className="text-ink">{value}</span>
    </p>
  );
}

export default async function AdminDashboardPage() {
  // Defence in depth — the proxy already gates this, but re-verify here.
  const auth = await getSupabaseAuthClient();
  if (!auth) redirect("/admin/login");
  const {
    data: { user },
  } = await auth.auth.getUser();
  if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL) {
    redirect("/admin/login");
  }

  const adminEmail = user.email ?? ADMIN_EMAIL;

  return (
    <div>
      <header className="border-b border-sand-300 bg-white">
        <div className="mx-auto flex max-w-container items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="font-display text-xl tracking-brand text-navy-800">
              SILA
            </p>
            <p className="text-xs text-muted">Admin · Leads</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted sm:inline">
              {adminEmail}
            </span>
            <a
              href="/"
              className="text-sm text-navy-700 underline hover:text-navy-900"
            >
              View site
            </a>
            <form action={signOutAdmin}>
              <button
                type="submit"
                className="rounded-lg border border-sand-300 px-3 py-1.5 text-sm text-navy-800 transition hover:bg-sand-200"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-container px-4 py-8 sm:px-6">
        {!isSupabaseAdminConfigured ? (
          <div className="rounded-xl border border-crimson-200 bg-crimson-50 p-6 text-crimson-800">
            <p className="font-medium">Service-role key not set</p>
            <p className="mt-1 text-sm">
              Add <code>SUPABASE_SERVICE_ROLE_KEY</code> to your environment to
              load leads here. Reads use the service role so lead tables stay
              private (they are not readable through the public API).
            </p>
          </div>
        ) : (
          <Leads />
        )}
      </main>
    </div>
  );
}

async function Leads() {
  const admin = getSupabaseAdminClient();

  const [enquiriesRes, submissionsRes] = await Promise.all([
    admin
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(300),
    admin
      .from("property_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(300),
  ]);

  const enquiries = (enquiriesRes.data ?? []) as Enquiry[];
  const submissions = (submissionsRes.data ?? []) as Submission[];
  const loadError = enquiriesRes.error?.message || submissionsRes.error?.message;

  // Pre-sign all submission files.
  const signed = await Promise.all(
    submissions.map((s) =>
      signPaths(admin, [
        ...(s.image_paths ?? []),
        ...(s.video_path ? [s.video_path] : []),
        ...(s.document_paths ?? []),
      ])
    )
  );

  return (
    <div className="space-y-10">
      {loadError ? (
        <div className="rounded-xl border border-crimson-200 bg-crimson-50 p-4 text-sm text-crimson-800">
          Could not load some data: {loadError}. Make sure the schema has been
          pushed (<code>supabase db push</code>).
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-4 sm:max-w-md">
        <div className="rounded-xl border border-sand-300 bg-white p-5 shadow-card">
          <p className="text-3xl font-semibold text-navy-800">
            {enquiries.length}
          </p>
          <p className="text-sm text-muted">Enquiries</p>
        </div>
        <div className="rounded-xl border border-sand-300 bg-white p-5 shadow-card">
          <p className="text-3xl font-semibold text-navy-800">
            {submissions.length}
          </p>
          <p className="text-sm text-muted">Property submissions</p>
        </div>
      </div>

      {/* Enquiries */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-navy-800">
          Enquiries &amp; contact messages
        </h2>
        {enquiries.length === 0 ? (
          <p className="text-sm text-muted">No enquiries yet.</p>
        ) : (
          <div className="space-y-3">
            {enquiries.map((e) => (
              <article
                key={e.id}
                className="rounded-xl border border-sand-300 bg-white p-5 shadow-card"
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-navy-800">
                    {e.name || "Unknown"}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs text-navy-700">
                      {e.source || "enquiry"}
                    </span>
                    <span className="rounded-full bg-sand-200 px-2.5 py-0.5 text-xs text-muted">
                      {e.status || "new"}
                    </span>
                  </div>
                </div>
                <div className="grid gap-1 sm:grid-cols-2">
                  <Field label="Phone" value={e.phone} />
                  <Field label="Email" value={e.email} />
                  <Field label="Country" value={e.country} />
                  <Field label="Service" value={e.service} />
                  <Field label="Location" value={e.location} />
                  <Field label="Budget" value={e.budget} />
                  <Field label="Preferred contact" value={e.preferred_contact} />
                  <Field label="About" value={e.context} />
                </div>
                {e.message ? (
                  <p className="mt-3 whitespace-pre-wrap rounded-lg bg-sand-100 p-3 text-sm text-ink">
                    {e.message}
                  </p>
                ) : null}
                <p className="mt-3 text-xs text-muted">{fmtDate(e.created_at)}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Property submissions */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-navy-800">
          List Your Property submissions
        </h2>
        {submissions.length === 0 ? (
          <p className="text-sm text-muted">No submissions yet.</p>
        ) : (
          <div className="space-y-3">
            {submissions.map((s, i) => (
              <article
                key={s.id}
                className="rounded-xl border border-sand-300 bg-white p-5 shadow-card"
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-navy-800">
                    {s.property_title || s.owner_name || "Untitled submission"}
                  </p>
                  <span className="rounded-full bg-sand-200 px-2.5 py-0.5 text-xs text-muted">
                    {s.status || "pending_review"}
                  </span>
                </div>
                <div className="grid gap-1 sm:grid-cols-2">
                  <Field label="Owner" value={s.owner_name} />
                  <Field label="Phone" value={s.owner_phone} />
                  <Field label="WhatsApp" value={s.owner_whatsapp} />
                  <Field label="Email" value={s.owner_email} />
                  <Field label="Type" value={s.property_type} />
                  <Field label="Listing" value={s.listing_type} />
                  <Field label="Location" value={s.location} />
                  <Field
                    label="Price"
                    value={
                      s.price ? `${s.currency ?? ""} ${s.price}`.trim() : null
                    }
                  />
                  <Field label="Bedrooms" value={s.bedrooms} />
                  <Field label="Bathrooms" value={s.bathrooms} />
                  <Field label="Size" value={s.size} />
                  <Field label="Land size" value={s.land_size} />
                  <Field label="Furnished" value={s.furnished} />
                  <Field label="Preferred contact" value={s.preferred_contact} />
                </div>
                {s.maps_link ? (
                  <p className="mt-2 text-sm">
                    <a
                      href={s.maps_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-navy-700 underline hover:text-navy-900"
                    >
                      Map location
                    </a>
                  </p>
                ) : null}
                {s.description ? (
                  <p className="mt-3 whitespace-pre-wrap rounded-lg bg-sand-100 p-3 text-sm text-ink">
                    {s.description}
                  </p>
                ) : null}
                {signed[i].length > 0 ? (
                  <div className="mt-3">
                    <p className="mb-1 text-xs font-medium text-muted">
                      Files ({signed[i].length}) — links expire in 1 hour
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {signed[i].map((f, j) => (
                        <a
                          key={f.path || j}
                          href={f.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border border-sand-300 px-2.5 py-1 text-xs text-navy-700 hover:bg-sand-200"
                        >
                          {f.path.split("/").pop() || `File ${j + 1}`}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
                <p className="mt-3 text-xs text-muted">{fmtDate(s.created_at)}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
