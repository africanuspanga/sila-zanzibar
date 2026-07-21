import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getTeamMember, type TeamRow } from "@/lib/admin/team";
import { PageHeader } from "@/components/admin/ui";
import { TeamForm } from "@/components/admin/TeamForm";

export const dynamic = "force-dynamic";

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const row = isNew ? null : await getTeamMember(id);
  if (!isNew && !row) notFound();

  return (
    <div>
      <PageHeader
        title={isNew ? "New team member" : "Edit team member"}
        subtitle="Changes appear on the public Team page immediately after saving."
        actions={
          <Link href="/admin/team" className="inline-flex items-center gap-1.5 text-sm text-navy-700 hover:text-navy-900">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        }
      />
      <TeamForm initial={row as TeamRow | null} />
    </div>
  );
}
