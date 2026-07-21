"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Building2,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { signOutAdmin } from "@/app/admin/actions";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/submissions", label: "Submissions", icon: FileText },
  { href: "/admin/listings", label: "Listings", icon: Building2 },
];

export function Sidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-navy-900 lg:flex">
        <div className="px-6 py-6">
          <span className="font-display text-2xl tracking-brand text-white">SILA</span>
          <p className="mt-0.5 text-xs uppercase tracking-[0.2em] text-navy-300">Admin</p>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {NAV.map((n) => {
            const Icon = n.icon;
            const active = isActive(n.href, n.exact);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-navy-700 font-medium text-white"
                    : "text-navy-200 hover:bg-navy-800 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-navy-800 p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-navy-200 transition hover:bg-navy-800 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            View site
          </Link>
          <div className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-700 text-xs font-semibold text-white">
              {email.slice(0, 1).toUpperCase()}
            </span>
            <span className="truncate text-xs text-navy-200">{email}</span>
          </div>
          <form action={signOutAdmin}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-navy-200 transition hover:bg-navy-800 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 border-b border-navy-800 bg-navy-900 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-display text-xl tracking-brand text-white">SILA</span>
          <form action={signOutAdmin}>
            <button type="submit" aria-label="Sign out" className="text-navy-200 hover:text-white">
              <LogOut className="h-5 w-5" />
            </button>
          </form>
        </div>
        <nav className="flex items-center gap-1 overflow-x-auto px-3 pb-2">
          {NAV.map((n) => {
            const active = isActive(n.href, n.exact);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs transition ${
                  active ? "bg-navy-700 font-medium text-white" : "text-navy-200 hover:bg-navy-800"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
