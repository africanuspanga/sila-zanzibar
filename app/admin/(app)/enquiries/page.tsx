import Link from "next/link";
import { Download } from "lucide-react";
import { fetchLeads, groupCount, sourceLabel, fmtDate, type Enquiry } from "@/lib/admin/data";
import { PageHeader, Panel, Avatar, Chip, EmptyState } from "@/components/admin/ui";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { updateEnquiryStatus } from "../leads-actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "closed", label: "Closed" },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "contact", label: "Contact" },
  { key: "property_enquiry", label: "Property" },
  { key: "project_enquiry", label: "Project" },
  { key: "plot_enquiry", label: "Plot" },
  { key: "enquiry", label: "General" },
];

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>;
}) {
  const { source } = await searchParams;
  const active = source && FILTERS.some((f) => f.key === source) ? source : "all";

  const { enquiries, error } = await fetchLeads();
  const counts = new Map(groupCount(enquiries, (e) => e.source ?? "enquiry"));
  const rows: Enquiry[] = active === "all" ? enquiries : enquiries.filter((e) => (e.source ?? "enquiry") === active);

  return (
    <div>
      <PageHeader
        title="Enquiries"
        subtitle={`${enquiries.length} total lead${enquiries.length === 1 ? "" : "s"} from contact and enquiry forms`}
        actions={
          enquiries.length > 0 ? (
            <a href="/admin/enquiries/export" className="btn-outline inline-flex items-center gap-1.5 text-sm">
              <Download className="h-4 w-4" /> Export CSV
            </a>
          ) : null
        }
      />

      {error ? (
        <div className="mb-6 rounded-xl border border-crimson-200 bg-crimson-50 px-4 py-3 text-sm text-crimson-800">
          Couldn&apos;t load data: {error}
        </div>
      ) : null}

      {/* Filter tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const n = f.key === "all" ? enquiries.length : counts.get(f.key) ?? 0;
          const on = active === f.key;
          return (
            <Link
              key={f.key}
              href={f.key === "all" ? "/admin/enquiries" : `/admin/enquiries?source=${f.key}`}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm transition ${
                on
                  ? "bg-navy-800 font-medium text-white"
                  : "border border-sand-300 bg-white text-navy-700 hover:bg-sand-100"
              }`}
            >
              {f.label}
              <span className={`rounded-full px-1.5 text-xs ${on ? "bg-white/20" : "bg-sand-200 text-muted"}`}>{n}</span>
            </Link>
          );
        })}
      </div>

      <Panel>
        {rows.length === 0 ? (
          <EmptyState title="No enquiries in this view" hint="Try a different filter." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sand-200 text-left text-xs uppercase tracking-wide text-muted">
                  <th className="pb-3 pr-3 font-medium">Name</th>
                  <th className="pb-3 pr-3 font-medium">Source</th>
                  <th className="hidden pb-3 pr-3 font-medium md:table-cell">Contact</th>
                  <th className="hidden pb-3 pr-3 font-medium lg:table-cell">Details</th>
                  <th className="hidden pb-3 pr-3 font-medium sm:table-cell">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((e) => (
                  <tr key={e.id} className="border-b border-sand-100 align-top last:border-0">
                    <td className="py-3.5 pr-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={e.name || "Unknown"} size={34} />
                        <div className="min-w-0">
                          <p className="truncate font-medium text-navy-900">{e.name || "Unknown"}</p>
                          {e.country ? <p className="truncate text-xs text-muted">{e.country}</p> : null}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 pr-3"><Chip>{sourceLabel(e.source)}</Chip></td>
                    <td className="hidden py-3.5 pr-3 md:table-cell">
                      {e.phone ? <p className="text-ink">{e.phone}</p> : null}
                      {e.email ? <p className="text-xs text-muted">{e.email}</p> : null}
                      {!e.phone && !e.email ? <span className="text-muted">—</span> : null}
                    </td>
                    <td className="hidden max-w-xs py-3.5 pr-3 lg:table-cell">
                      {e.context ? <p className="text-navy-800">{e.context}</p> : null}
                      {e.message ? <p className="line-clamp-2 text-xs text-muted">{e.message}</p> : null}
                      {[e.service, e.location, e.budget].filter(Boolean).length > 0 ? (
                        <p className="mt-0.5 text-xs text-muted">{[e.service, e.location, e.budget].filter(Boolean).join(" · ")}</p>
                      ) : null}
                      {!e.context && !e.message && !e.service && !e.location && !e.budget ? <span className="text-muted">—</span> : null}
                    </td>
                    <td className="hidden py-3.5 pr-3 text-muted sm:table-cell">{fmtDate(e.created_at)}</td>
                    <td className="py-3.5">
                      <StatusSelect id={e.id} current={e.status ?? "new"} options={STATUS_OPTIONS} action={updateEnquiryStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
