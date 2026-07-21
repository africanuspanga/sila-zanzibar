import Link from "next/link";
import { Plus } from "lucide-react";
import { listTeam } from "@/lib/admin/team";
import { isSupabaseAdminConfigured } from "@/lib/supabase/env";
import { PageHeader, Panel, Avatar, Chip, EmptyState } from "@/components/admin/ui";
import { TeamActions } from "@/components/admin/TeamActions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TeamPage() {
  if (!isSupabaseAdminConfigured) {
    return (
      <div>
        <PageHeader title="Team" />
        <Panel>
          <EmptyState title="Backend not configured" hint="Set SUPABASE_SERVICE_ROLE_KEY to manage the team." />
        </Panel>
      </div>
    );
  }

  const team = await listTeam();

  return (
    <div>
      <PageHeader
        title="Team / Agents"
        subtitle="Add, edit and remove the people shown on the public Team page."
        actions={
          <Link
            href="/admin/team/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-navy-800 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-navy-900"
          >
            <Plus className="h-4 w-4" /> Add member
          </Link>
        }
      />

      <Panel title={`Team members (${team.length})`}>
        {team.length === 0 ? (
          <EmptyState title="No team members yet" hint="Add your first agent to show them on the site." />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {team.map((m) => (
              <div key={m.id} className="flex items-center gap-3 rounded-xl border border-sand-200 p-3">
                {m.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={m.image} alt={m.name} className="h-12 w-12 shrink-0 rounded-full object-cover" />
                ) : (
                  <Avatar name={m.name} size={48} />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium text-navy-900">{m.name}</p>
                    {!m.published ? (
                      <span className="rounded-full bg-sand-200 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">
                        Hidden
                      </span>
                    ) : null}
                  </div>
                  <p className="truncate text-sm text-muted">{m.title}</p>
                  <div className="mt-1">
                    <Chip>{m.base}</Chip>
                  </div>
                </div>
                <TeamActions id={m.id} published={m.published} />
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}
