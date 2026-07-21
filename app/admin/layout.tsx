import type { Metadata } from "next";

// The admin area must never be indexed or followed by search engines.
export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-sand-100 text-ink">{children}</div>;
}
