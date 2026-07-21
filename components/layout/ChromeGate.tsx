"use client";

import { usePathname } from "next/navigation";

// Hides the public marketing chrome (header, footer, WhatsApp button) on the
// /admin dashboard so it renders as a clean internal tool. The children are
// Server Components passed through untouched — this only decides whether to
// render them.
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
