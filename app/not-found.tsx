import Link from "next/link";
import { Home, Search } from "lucide-react";
import { ArchOutline } from "@/components/ui/Arch";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-navy-950 px-6 text-center text-white">
      <ArchOutline
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[400px] -translate-x-1/2 -translate-y-1/2 text-white/[0.05]"
        strokeWidth={1.5}
      />
      <div className="relative">
        <p className="font-display text-[6rem] leading-none text-white/90 sm:text-[8rem]">404</p>
        <h1 className="h-display mt-2 text-3xl text-white sm:text-4xl">
          This page could not be found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">
          The page you&apos;re looking for may have moved. Let&apos;s get you back to
          finding your place in Zanzibar.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-red">
            <Home className="h-4 w-4" /> Back to Home
          </Link>
          <Link href="/properties" className="btn-ghost-light">
            <Search className="h-4 w-4" /> Browse Properties
          </Link>
        </div>
      </div>
    </section>
  );
}
