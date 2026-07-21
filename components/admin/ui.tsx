import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { statusLabel } from "@/lib/admin/data";

// Shared presentational building blocks for the admin dashboard (server-safe).

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold text-navy-900">{title}</h1>
        {subtitle ? <p className="mt-0.5 text-sm text-muted">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
  className = "",
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-sand-300 bg-white p-5 shadow-card ${className}`}>
      {title ? (
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-semibold text-navy-900">{title}</h2>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function TrendChip({ delta }: { delta: number }) {
  const neutral = delta === 0;
  const up = delta > 0;
  const cls = neutral
    ? "bg-sand-200 text-muted"
    : up
      ? "bg-emerald-50 text-emerald-700"
      : "bg-crimson-50 text-crimson-700";
  const Icon = neutral ? Minus : up ? TrendingUp : TrendingDown;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>
      <Icon className="h-3 w-3" />
      {Math.abs(delta)}%
    </span>
  );
}

export function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: number | string;
  delta?: number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-sand-300 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
          <Icon className="h-5 w-5" />
        </span>
        {typeof delta === "number" ? <TrendChip delta={delta} /> : null}
      </div>
      <p className="mt-4 text-3xl font-semibold leading-none text-navy-900">{value}</p>
      <p className="mt-1.5 text-sm text-muted">{label}</p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}

const PALETTE = ["#0d2f5c", "#123566", "#1c437f", "#8a1620", "#a71722", "#3f65a0"];

export function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const clean = (name || "?").trim();
  const initials =
    clean
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "?";
  let h = 0;
  for (const ch of clean) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const bg = PALETTE[h % PALETTE.length];
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
      style={{ background: bg, width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials}
    </span>
  );
}

const STATUS_STYLES: Record<string, string> = {
  new: "bg-navy-50 text-navy-700 ring-navy-100",
  contacted: "bg-amber-50 text-amber-700 ring-amber-100",
  closed: "bg-sand-200 text-muted ring-sand-300",
  pending_review: "bg-amber-50 text-amber-700 ring-amber-100",
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  rejected: "bg-crimson-50 text-crimson-700 ring-crimson-100",
};

export function StatusBadge({ status }: { status?: string | null }) {
  const key = status ?? "new";
  const cls = STATUS_STYLES[key] ?? "bg-sand-200 text-muted ring-sand-300";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${cls}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {statusLabel(key)}
    </span>
  );
}

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-sand-100 px-2.5 py-0.5 text-xs font-medium text-navy-700 ring-1 ring-inset ring-sand-300">
      {children}
    </span>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-sand-300 bg-sand-50 px-6 py-10 text-center">
      <p className="text-sm font-medium text-navy-800">{title}</p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}
