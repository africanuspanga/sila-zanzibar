import { Paperclip, MapPin } from "lucide-react";
import { fetchLeads, signFiles, submissionPaths, fmtDate } from "@/lib/admin/data";
import { PageHeader, Panel, Avatar, StatusBadge, EmptyState } from "@/components/admin/ui";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
      <dd className="text-sm text-ink">{value}</dd>
    </div>
  );
}

export default async function SubmissionsPage() {
  const { submissions, error } = await fetchLeads();
  const signed = await Promise.all(submissions.map((s) => signFiles(submissionPaths(s))));

  return (
    <div>
      <PageHeader
        title="Property submissions"
        subtitle={`${submissions.length} owner submission${submissions.length === 1 ? "" : "s"} from “List Your Property”`}
      />

      {error ? (
        <div className="mb-6 rounded-xl border border-crimson-200 bg-crimson-50 px-4 py-3 text-sm text-crimson-800">
          Couldn&apos;t load data: {error}
        </div>
      ) : null}

      {submissions.length === 0 ? (
        <Panel>
          <EmptyState
            title="No submissions yet"
            hint="When property owners submit the “List Your Property” form, their details and uploaded media appear here."
          />
        </Panel>
      ) : (
        <div className="space-y-4">
          {submissions.map((s, i) => (
            <Panel key={s.id}>
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar name={s.owner_name || s.property_title || "?"} size={40} />
                  <div>
                    <p className="font-semibold text-navy-900">{s.property_title || "Untitled property"}</p>
                    <p className="text-xs text-muted">
                      by {s.owner_name || "Unknown"} · {fmtDate(s.created_at)}
                    </p>
                  </div>
                </div>
                <StatusBadge status={s.status} />
              </div>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
                <Field label="Owner phone" value={s.owner_phone} />
                <Field label="WhatsApp" value={s.owner_whatsapp} />
                <Field label="Owner email" value={s.owner_email} />
                <Field label="Preferred contact" value={s.preferred_contact} />
                <Field label="Type" value={s.property_type} />
                <Field label="Listing" value={s.listing_type} />
                <Field label="Location" value={s.location} />
                <Field label="Price" value={s.price ? `${s.currency ?? ""} ${s.price}`.trim() : null} />
                <Field label="Bedrooms" value={s.bedrooms} />
                <Field label="Bathrooms" value={s.bathrooms} />
                <Field label="Size" value={s.size} />
                <Field label="Land size" value={s.land_size} />
                <Field label="Furnished" value={s.furnished} />
              </dl>

              {s.description ? (
                <p className="mt-4 whitespace-pre-wrap rounded-lg bg-sand-100 p-3 text-sm text-ink">{s.description}</p>
              ) : null}

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {s.maps_link ? (
                  <a
                    href={s.maps_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-navy-700 underline hover:text-navy-900"
                  >
                    <MapPin className="h-4 w-4" /> Map location
                  </a>
                ) : null}
              </div>

              {signed[i].length > 0 ? (
                <div className="mt-4 border-t border-sand-200 pt-4">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted">
                    <Paperclip className="h-3.5 w-3.5" />
                    {signed[i].length} file{signed[i].length === 1 ? "" : "s"} · links expire in 1 hour
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {signed[i].map((f, j) => (
                      <a
                        key={f.path || j}
                        href={f.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-sand-300 bg-white px-2.5 py-1.5 text-xs text-navy-700 transition hover:bg-sand-100"
                      >
                        <Paperclip className="h-3.5 w-3.5" />
                        {f.name}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
}
