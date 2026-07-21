"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";

export function Section({ title, children, full = false }: { title: string; children: React.ReactNode; full?: boolean }) {
  return (
    <section className="rounded-2xl border border-sand-300 bg-white p-5 shadow-card">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-navy-800">{title}</h2>
      <div className={full ? "" : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"}>{children}</div>
    </section>
  );
}

export function SaveBar({
  saving,
  editing,
  cancelHref = "/admin/listings",
}: {
  saving: boolean;
  editing: boolean;
  cancelHref?: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-sand-300 bg-white/95 backdrop-blur lg:pl-64">
      <div className="mx-auto flex max-w-[1200px] items-center justify-end gap-3 px-4 py-3 sm:px-8">
        <Link href={cancelHref} className="btn-outline text-sm">
          Cancel
        </Link>
        <button type="submit" disabled={saving} className="btn-red text-sm disabled:opacity-60">
          {saving ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving…
            </span>
          ) : editing ? (
            "Save changes"
          ) : (
            "Create listing"
          )}
        </button>
      </div>
    </div>
  );
}
