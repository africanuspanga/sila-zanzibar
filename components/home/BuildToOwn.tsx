import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileSignature } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { buildSteps } from "@/lib/data";

const unitTypes = [
  "Condominiums",
  "Standalone apartments",
  "Standalone villas",
  "Residential communities",
  "Mixed-use developments",
];

export function BuildToOwn() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 text-white lg:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <span className="eyebrow-light">
                <span className="h-px w-6 bg-current" /> Build-to-Own
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-display mt-4 text-[2.4rem] leading-[1.05] text-white sm:text-[3.2rem]">
                Build Today.<br />Own Tomorrow.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-[1rem] leading-relaxed text-white/75">
                SILA&apos;s build-to-own opportunities allow customers to secure selected
                properties during construction and make payments according to an agreed
                installment schedule. Once construction and the required payments are
                completed, the finished property is transferred to the buyer under the
                applicable agreement and legal process.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-2">
                {unitTypes.map((t) => (
                  <span
                    key={t}
                    className="border border-white/20 px-3 py-1.5 text-[0.74rem] text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/projects" className="btn-red group">
                  Explore Build-to-Own Projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/projects#payment-plan" className="btn-ghost-light">
                  <FileSignature className="h-4 w-4" /> Request a Payment Plan
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/silo-image-5.jpg"
                alt="A beachfront residential development in Zanzibar"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
            </div>
          </Reveal>
        </div>

        {/* Steps */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <Reveal>
            <h3 className="mb-8 text-xs font-semibold uppercase tracking-brand text-white/50">
              How It Works
            </h3>
          </Reveal>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {buildSteps.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.06}>
                <div className="relative">
                  <span className="font-display text-4xl text-white/25">{s.step}</span>
                  <div className="mt-3 h-px w-full bg-white/15">
                    <div className="h-px w-1/2 bg-crimson-500" />
                  </div>
                  <h4 className="mt-4 font-display text-lg text-white">{s.title}</h4>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-white/60">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
