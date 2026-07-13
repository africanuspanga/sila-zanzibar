import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ArchOutline } from "@/components/ui/Arch";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  crumb,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  image: string;
  crumb?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 pt-[68px] lg:pt-[76px]">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/55 to-navy-950/95" />
      <ArchOutline
        className="pointer-events-none absolute -top-6 right-[8%] hidden h-[360px] w-[260px] text-white/[0.06] lg:block"
        strokeWidth={1.5}
      />

      <div className="container-x relative py-16 lg:py-24">
        <nav className="mb-5 flex items-center gap-1.5 text-[0.75rem] text-white/55">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/85">{crumb ?? eyebrow}</span>
        </nav>

        {eyebrow && (
          <span className="eyebrow-light">
            <span className="h-px w-6 bg-current" /> {eyebrow}
          </span>
        )}
        <h1 className="h-display mt-4 max-w-3xl text-[2.6rem] leading-[1.05] text-white sm:text-[3.4rem]">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-white/75">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
