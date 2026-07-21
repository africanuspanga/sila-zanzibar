import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import {
  getOne,
  KIND_LABEL,
  KIND_PUBLIC_PATH,
  type ListingKind,
  type PropertyRow,
  type ProjectRow,
  type PlotRow,
} from "@/lib/admin/listings";
import { PageHeader } from "@/components/admin/ui";
import { PropertyForm } from "@/components/admin/listing-forms/PropertyForm";
import { ProjectForm } from "@/components/admin/listing-forms/ProjectForm";
import { PlotForm } from "@/components/admin/listing-forms/PlotForm";

export const dynamic = "force-dynamic";

const KINDS: ListingKind[] = ["property", "project", "plot"];

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>;
}) {
  const { type, id } = await params;
  if (!KINDS.includes(type as ListingKind)) notFound();
  const kind = type as ListingKind;
  const isNew = id === "new";

  const row = isNew ? null : await getOne(kind, id);
  if (!isNew && !row) notFound();

  const slug = (row as { slug?: string } | null)?.slug;
  const published = (row as { published?: boolean } | null)?.published;

  return (
    <div>
      <PageHeader
        title={`${isNew ? "New" : "Edit"} ${KIND_LABEL[kind].toLowerCase()}`}
        subtitle="Changes appear on the public site immediately after saving."
        actions={
          <div className="flex items-center gap-2">
            {!isNew && slug && published ? (
              <a
                href={`${KIND_PUBLIC_PATH[kind]}/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-1.5 text-sm"
              >
                View <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
            <Link href="/admin/listings" className="inline-flex items-center gap-1.5 text-sm text-navy-700 hover:text-navy-900">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
          </div>
        }
      />

      {kind === "property" ? <PropertyForm initial={row as unknown as PropertyRow | null} /> : null}
      {kind === "project" ? <ProjectForm initial={row as unknown as ProjectRow | null} /> : null}
      {kind === "plot" ? <PlotForm initial={row as unknown as PlotRow | null} /> : null}
    </div>
  );
}
