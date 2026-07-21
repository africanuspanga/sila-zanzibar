import Link from "next/link";
import { Inbox, FileText, Building2, Clock, ArrowRight } from "lucide-react";
import { getProperties, getProjects, getPlots } from "@/lib/content";
import {
  fetchLeads,
  trend,
  groupCount,
  weekly,
  sourceLabel,
  statusLabel,
  fmtDay,
} from "@/lib/admin/data";
import { PageHeader, Panel, StatCard, Avatar, StatusBadge, Chip, EmptyState } from "@/components/admin/ui";
import { AreaChart, Donut, BarList, CHART_COLORS } from "@/components/admin/charts";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboard() {
  const [{ enquiries, submissions, error }, properties, projects, plots] = await Promise.all([
    fetchLeads(),
    getProperties(),
    getProjects(),
    getPlots(),
  ]);

  const listingCount = properties.length + projects.length + plots.length;
  const eTrend = trend(enquiries);
  const sTrend = trend(submissions);
  const pending = submissions.filter((s) => (s.status ?? "pending_review") === "pending_review").length;

  const sourceGroups = groupCount(enquiries, (e) => e.source ?? "enquiry");
  const sourceSegments = sourceGroups.map(([k, v], i) => ({
    label: sourceLabel(k),
    value: v,
    color: CHART_COLORS[i % CHART_COLORS.length],
  }));

  const statusGroups = groupCount(submissions, (s) => s.status ?? "pending_review");
  const STATUS_COLORS: Record<string, string> = {
    pending_review: "#d97706",
    approved: "#059669",
    rejected: "#C91F2C",
  };
  const statusItems = statusGroups.map(([k, v]) => ({
    label: statusLabel(k),
    value: v,
    color: STATUS_COLORS[k] ?? "#123566",
  }));

  const wk = weekly(enquiries, 8);
  const recentEnquiries = enquiries.slice(0, 6);
  const recentSubmissions = submissions.slice(0, 5);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Leads, submissions and listings at a glance"
        actions={
          <Link href="/admin/enquiries" className="btn-outline text-sm">
            View all enquiries
          </Link>
        }
      />

      {error ? (
        <div className="mb-6 rounded-xl border border-crimson-200 bg-crimson-50 px-4 py-3 text-sm text-crimson-800">
          Couldn&apos;t load live data: {error}. Check that the schema is pushed and
          <code className="mx-1">SUPABASE_SERVICE_ROLE_KEY</code> is set.
        </div>
      ) : null}

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Inbox} label="Total enquiries" value={enquiries.length} delta={eTrend.delta} hint={`${eTrend.cur} in the last 7 days`} />
        <StatCard icon={FileText} label="Property submissions" value={submissions.length} delta={sTrend.delta} hint={`${sTrend.cur} in the last 7 days`} />
        <StatCard icon={Clock} label="Pending review" value={pending} hint="Submissions awaiting a decision" />
        <StatCard icon={Building2} label="Live listings" value={listingCount} hint={`${properties.length} properties · ${projects.length} projects · ${plots.length} plots`} />
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel title="Enquiries over time" className="lg:col-span-2">
          <p className="-mt-2 mb-2 text-xs text-muted">Last 8 weeks</p>
          <AreaChart data={wk.counts} labels={wk.labels} />
        </Panel>
        <Panel title="Leads by source">
          <Donut segments={sourceSegments} total={enquiries.length} />
        </Panel>
      </div>

      {/* Recent activity */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel
          title="Recent enquiries"
          className="lg:col-span-2"
          action={
            <Link href="/admin/enquiries" className="inline-flex items-center gap-1 text-sm text-navy-700 hover:text-navy-900">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        >
          {recentEnquiries.length === 0 ? (
            <EmptyState title="No enquiries yet" hint="Leads from the contact and enquiry forms will appear here." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-sand-200 text-left text-xs uppercase tracking-wide text-muted">
                    <th className="pb-2 pr-3 font-medium">Name</th>
                    <th className="pb-2 pr-3 font-medium">Source</th>
                    <th className="hidden pb-2 pr-3 font-medium sm:table-cell">Contact</th>
                    <th className="hidden pb-2 pr-3 font-medium md:table-cell">Date</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEnquiries.map((e) => (
                    <tr key={e.id} className="border-b border-sand-100 last:border-0">
                      <td className="py-3 pr-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={e.name || "Unknown"} size={32} />
                          <div className="min-w-0">
                            <p className="truncate font-medium text-navy-900">{e.name || "Unknown"}</p>
                            {e.location ? <p className="truncate text-xs text-muted">{e.location}</p> : null}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-3"><Chip>{sourceLabel(e.source)}</Chip></td>
                      <td className="hidden py-3 pr-3 text-muted sm:table-cell">{e.phone || e.email || "—"}</td>
                      <td className="hidden py-3 pr-3 text-muted md:table-cell">{fmtDay(e.created_at)}</td>
                      <td className="py-3"><StatusBadge status={e.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>

        <div className="space-y-4">
          <Panel title="Submissions by status">
            <BarList items={statusItems} />
          </Panel>
          <Panel
            title="Latest submissions"
            action={
              <Link href="/admin/submissions" className="inline-flex items-center gap-1 text-sm text-navy-700 hover:text-navy-900">
                All <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
          >
            {recentSubmissions.length === 0 ? (
              <EmptyState title="No submissions yet" />
            ) : (
              <ul className="space-y-3">
                {recentSubmissions.map((s) => (
                  <li key={s.id} className="flex items-center gap-3">
                    <Avatar name={s.owner_name || s.property_title || "?"} size={32} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-navy-900">
                        {s.property_title || s.owner_name || "Untitled"}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {[s.property_type, s.location].filter(Boolean).join(" · ") || fmtDay(s.created_at)}
                      </p>
                    </div>
                    <StatusBadge status={s.status} />
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}
