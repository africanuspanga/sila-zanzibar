import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/guard";
import { fetchLeads, fmtDate } from "@/lib/admin/data";

export const dynamic = "force-dynamic";

const COLUMNS: { key: string; label: string }[] = [
  { key: "created_at", label: "Date" },
  { key: "name", label: "Name" },
  { key: "source", label: "Source" },
  { key: "status", label: "Status" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "country", label: "Country" },
  { key: "service", label: "Service" },
  { key: "location", label: "Location" },
  { key: "budget", label: "Budget" },
  { key: "currency", label: "Currency" },
  { key: "preferred_date", label: "Preferred date" },
  { key: "preferred_contact", label: "Preferred contact" },
  { key: "context", label: "About" },
  { key: "message", label: "Message" },
];

function esc(v: unknown): string {
  const s = v === null || v === undefined ? "" : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET() {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { enquiries } = await fetchLeads();
  const header = COLUMNS.map((c) => c.label).join(",");
  const rows = enquiries.map((e) =>
    COLUMNS.map((c) =>
      esc(c.key === "created_at" ? fmtDate(e.created_at) : (e as Record<string, unknown>)[c.key])
    ).join(",")
  );
  // BOM so Excel reads UTF-8 correctly.
  const csv = "﻿" + [header, ...rows].join("\r\n");

  const stamp = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="sila-enquiries-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
