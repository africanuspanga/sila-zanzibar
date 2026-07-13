import Link from "next/link";
import { Home, Hammer, Map, Compass, Tag, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { coreServices } from "@/lib/data";

const icons = { home: Home, hammer: Hammer, map: Map, compass: Compass, tag: Tag };

export function CoreServices() {
  return (
    <section id="services" className="bg-sand-100 py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="What we do"
            title="Complete Real Estate Services in Zanzibar"
          />
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-muted md:text-right">
              From finding the right property to understanding where and how to
              invest, SILA brings property expertise, local insight and professional
              support together under one roof.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((s, i) => {
            const Icon = icons[s.icon];
            const featured = i === 0;
            return (
              <Reveal key={s.title} delay={i * 0.06}>
                <Link
                  href={s.cta.href}
                  className={`group flex h-full flex-col border p-7 transition-all duration-500 ease-silk hover:-translate-y-1 hover:shadow-card-hover ${
                    featured
                      ? "border-navy-800 bg-navy-800 text-white"
                      : "border-sand-300 bg-white"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center ${
                      featured ? "bg-white/10 text-white" : "bg-navy-800/5 text-navy-800"
                    }`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3
                    className={`mt-6 font-display text-2xl leading-snug ${
                      featured ? "text-white" : "text-ink"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p
                    className={`mt-3 flex-1 text-[0.9rem] leading-relaxed ${
                      featured ? "text-white/75" : "text-muted"
                    }`}
                  >
                    {s.body}
                  </p>
                  <span
                    className={`mt-6 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold ${
                      featured ? "text-white" : "text-crimson-600"
                    }`}
                  >
                    {s.cta.label}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
