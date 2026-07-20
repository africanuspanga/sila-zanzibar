import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ArchImage } from "@/components/ui/Arch";

export function Intro() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-current" /> Who we are
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-display mt-4 text-[2.1rem] leading-[1.08] text-ink sm:text-[2.9rem]">
              Property Opportunities Designed Around Your Future
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[1.02rem] leading-relaxed text-muted">
              As a Zanzibar real estate developer and investor, SILA gives you access
              to carefully selected opportunities — whether you are searching for a
              home, building an investment portfolio, purchasing land or looking for
              commercial space across the island.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">
              We work with buyers, tenants, property owners, developers, businesses
              and investors to simplify every stage of the property process.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 border-l-2 border-crimson-600 pl-5">
              <p className="font-display text-xl text-navy-800">
                One trusted partner for property, development and investment.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <Link href="/about" className="btn-primary group mt-8">
              Discover SILA
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <ArchImage
            src="/who-we-are.jpg"
            alt="A premium Zanzibar resort with pool and tropical gardens"
            className="aspect-[4/5] w-full"
            sizes="(max-width:1024px) 100vw, 45vw"
          />
          <div className="absolute -bottom-6 -left-6 hidden bg-navy-800 px-7 py-6 text-white shadow-float sm:block">
            <p className="font-display text-4xl leading-none">SILA</p>
            <p className="mt-1 text-[0.72rem] uppercase tracking-brand text-white/60">
              Zanzibar Real Estate
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
