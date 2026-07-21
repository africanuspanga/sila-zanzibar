// Server-only data + aggregation helpers for the admin dashboard.
// All reads go through the service-role client (never exposed to the browser).

import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { PROPERTY_SUBMISSIONS_BUCKET } from "@/lib/supabase/client";
import { isSupabaseAdminConfigured } from "@/lib/supabase/env";

export type Enquiry = {
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

export type Submission = {
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

export type SignedFile = { path: string; url: string; name: string };

export async function fetchLeads(): Promise<{
  enquiries: Enquiry[];
  submissions: Submission[];
  error: string | null;
}> {
  if (!isSupabaseAdminConfigured) {
    return { enquiries: [], submissions: [], error: "SUPABASE_SERVICE_ROLE_KEY not set" };
  }
  try {
    const admin = getSupabaseAdminClient();
    const [e, s] = await Promise.all([
      admin.from("enquiries").select("*").order("created_at", { ascending: false }).limit(1000),
      admin.from("property_submissions").select("*").order("created_at", { ascending: false }).limit(1000),
    ]);
    return {
      enquiries: (e.data ?? []) as Enquiry[],
      submissions: (s.data ?? []) as Submission[],
      error: e.error?.message || s.error?.message || null,
    };
  } catch (err) {
    return { enquiries: [], submissions: [], error: err instanceof Error ? err.message : String(err) };
  }
}

export async function signFiles(paths: string[]): Promise<SignedFile[]> {
  const clean = paths.filter(Boolean);
  if (clean.length === 0 || !isSupabaseAdminConfigured) return [];
  try {
    const admin = getSupabaseAdminClient();
    const { data } = await admin.storage.from(PROPERTY_SUBMISSIONS_BUCKET).createSignedUrls(clean, 60 * 60);
    return (data ?? [])
      .filter((d) => d.signedUrl)
      .map((d) => ({ path: d.path ?? "", url: d.signedUrl as string, name: (d.path ?? "").split("/").pop() || "file" }));
  } catch {
    return [];
  }
}

export function submissionPaths(s: Submission): string[] {
  return [...(s.image_paths ?? []), ...(s.video_path ? [s.video_path] : []), ...(s.document_paths ?? [])];
}

// --- aggregations ----------------------------------------------------------
const DAY = 86_400_000;

export function countInWindow(items: { created_at: string }[], days: number, offsetDays = 0): number {
  const now = Date.now();
  const start = now - (days + offsetDays) * DAY;
  const end = now - offsetDays * DAY;
  return items.filter((i) => {
    const t = new Date(i.created_at).getTime();
    return t >= start && t < end;
  }).length;
}

export function trend(items: { created_at: string }[], days = 7): { cur: number; delta: number } {
  const cur = countInWindow(items, days, 0);
  const prev = countInWindow(items, days, days);
  const delta = prev === 0 ? (cur > 0 ? 100 : 0) : Math.round(((cur - prev) / prev) * 100);
  return { cur, delta };
}

export function groupCount<T>(items: T[], key: (t: T) => string): [string, number][] {
  const m = new Map<string, number>();
  for (const it of items) {
    const k = key(it) || "—";
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
}

export function weekly(items: { created_at: string }[], weeks = 8): { counts: number[]; labels: string[] } {
  const now = Date.now();
  const counts = new Array(weeks).fill(0);
  const labels: string[] = [];
  for (let i = 0; i < weeks; i++) {
    const d = new Date(now - (weeks - 1 - i) * 7 * DAY);
    labels.push(d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }));
  }
  for (const it of items) {
    const ago = Math.floor((now - new Date(it.created_at).getTime()) / (7 * DAY));
    if (ago >= 0 && ago < weeks) counts[weeks - 1 - ago]++;
  }
  return { counts, labels };
}

const SOURCE_LABELS: Record<string, string> = {
  contact: "Contact form",
  enquiry: "General enquiry",
  property_enquiry: "Property",
  project_enquiry: "Project",
  plot_enquiry: "Plot",
};

export function sourceLabel(s?: string | null): string {
  return SOURCE_LABELS[s ?? ""] ?? (s || "—");
}

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  closed: "Closed",
  pending_review: "Pending review",
  approved: "Approved",
  rejected: "Rejected",
};

export function statusLabel(s?: string | null): string {
  return STATUS_LABELS[s ?? ""] ?? (s || "—");
}

export function fmtDate(iso: string): string {
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

export function fmtDay(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}
