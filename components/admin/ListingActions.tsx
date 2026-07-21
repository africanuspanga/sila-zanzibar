"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import { deleteListing, togglePublished } from "@/app/admin/(app)/listings/actions";
import type { ListingKind } from "@/lib/admin/listings";

export function ListingActions({
  kind,
  id,
  published,
  editHref,
}: {
  kind: ListingKind;
  id: string;
  published: boolean;
  editHref: string;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        title={published ? "Published — click to hide" : "Hidden — click to publish"}
        onClick={() => start(async () => {
          await togglePublished(kind, id, !published);
          router.refresh();
        })}
        className={`rounded-lg border p-1.5 transition ${
          published
            ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            : "border-sand-300 bg-white text-muted hover:bg-sand-100"
        }`}
      >
        {published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      </button>

      <Link
        href={editHref}
        title="Edit"
        className="rounded-lg border border-sand-300 bg-white p-1.5 text-navy-700 transition hover:bg-sand-100"
      >
        <Pencil className="h-4 w-4" />
      </Link>

      <button
        type="button"
        title="Delete"
        disabled={pending}
        onClick={() => {
          if (window.confirm("Delete this listing permanently? This cannot be undone.")) {
            start(async () => {
              await deleteListing(kind, id);
              router.refresh();
            });
          }
        }}
        className="rounded-lg border border-sand-300 bg-white p-1.5 text-crimson-600 transition hover:bg-crimson-50 disabled:opacity-50"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
