import Link from "next/link";
import Image from "next/image";
import { CalendarCheck, Info } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { consultancyServices, investmentDisclaimer } from "@/lib/data";

export function InvestmentConsultancy() {
  return (
    <section className="bg-sand-100 py-20 lg:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="eyebrow">
                <span className="h-px w-6 bg-current" /> Investment Advisory
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-display mt-4 text-[2.1rem] leading-[1.08] text-ink sm:text-[2.9rem]">
                Invest in Zanzibar With Greater Clarity
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[1rem] leading-relaxed text-muted">
                Real estate investment requires more than finding an attractive
                property. SILA helps clients understand the location, market
                opportunity, documentation, acquisition process, development
                possibilities and potential risks before making a commitment.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative mt-8 aspect-[16/10] overflow-hidden">
                <Image
                  src="/silo-image-4.jpg"
                  alt="Investment consultancy in Zanzibar"
                  fill
                  sizes="(max-width:1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-6 flex items-start gap-3 border border-sand-300 bg-white p-5">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-crimson-600" />
                <p className="text-[0.8rem] leading-relaxed text-muted">{investmentDisclaimer}</p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <Link href="/investment-advisory" className="btn-red group mt-7">
                <CalendarCheck className="h-4 w-4" />
                Book an Investment Consultation
              </Link>
            </Reveal>
          </div>

          <div>
            <div className="grid gap-px overflow-hidden border border-sand-300 bg-sand-300 sm:grid-cols-2">
              {consultancyServices.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.05}>
                  <div className="h-full bg-white p-7">
                    <span className="font-display text-2xl text-crimson-600">
                      0{i + 1}
                    </span>
                    <h3 className="mt-3 font-display text-lg text-navy-800">{s.title}</h3>
                    <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <div className="mt-px bg-navy-800 p-7 text-white">
                <h3 className="font-display text-lg">Due Diligence Coordination</h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-white/75">
                  SILA can coordinate with qualified lawyers, surveyors, valuers,
                  architects and relevant professionals where their expertise is
                  required.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
