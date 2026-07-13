"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { primaryNav } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Transparent only over the homepage's dark video hero; solid everywhere else.
  const solid = scrolled || open || pathname !== "/";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-silk",
        solid
          ? "bg-white/95 shadow-[0_1px_0_rgba(8,43,92,0.08)] backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1600px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-[82px] lg:px-14">
        <Logo tone={solid ? "dark" : "light"} width={124} />

        <nav className="hidden items-center gap-6 xl:flex 2xl:gap-8">
          {primaryNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative whitespace-nowrap text-[0.8rem] font-medium tracking-wide transition-colors",
                  solid ? "text-navy-800/80 hover:text-navy-800" : "text-white/85 hover:text-white",
                  active && (solid ? "text-navy-800" : "text-white")
                )}
              >
                {item.label}
                {active && (
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px w-full",
                      solid ? "bg-crimson-600" : "bg-white"
                    )}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center lg:flex">
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 bg-crimson-600 px-5 py-3 text-[0.8rem] font-semibold text-white transition-all duration-300 hover:bg-crimson-700"
          >
            <Search className="h-4 w-4" />
            Find a Property
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "flex h-10 w-10 items-center justify-center transition-colors",
              solid ? "text-navy-800" : "text-white"
            )}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-sand-300 bg-white transition-[max-height] duration-500 ease-silk xl:hidden",
          open ? "max-h-[80vh]" : "max-h-0"
        )}
      >
        <nav className="mx-auto flex w-full max-w-[1600px] flex-col px-5 py-4 sm:px-8">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-sand-200 py-3.5 text-[0.95rem] font-medium text-navy-800"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4">
            <Link href="/properties" className="btn-red w-full">
              Find a Property
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
