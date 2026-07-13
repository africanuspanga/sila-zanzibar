import type { Metadata } from "next";
import Image from "next/image";
import { Info, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { consultancyServices, investmentDisclaimer } from "@/lib/data";

export const metadata: Metadata = {
  title: "Investment Advisory in Zanzibar",
  description:
    "Professional land and property investment guidance in Zanzibar — location analysis, market assessment, legal coordination and foreign-investor guidance.",
};

export default function InvestmentAdvisoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Investment Advisory"
        crumb="Investment Advisory"
        title="Invest in Zanzibar With Greater Clarity"
        intro="Real estate investment requires more than finding an attractive property. SILA helps you understand the location, market opportunity, documentation, acquisition process, development possibilities and potential risks before you commit."
        image="/silo-image-4.jpg"
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="container-x">
          <div className="grid gap-px overflow-hidden border border-sand-300 bg-sand-300 sm:grid-cols-2 lg:grid-cols-3">
            {consultancyServices.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.05}>
                <div className="h-full bg-white p-8">
                  <span className="font-display text-3xl text-crimson-600">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-xl text-navy-800">{s.title}</h3>
                  <p className="mt-2.5 text-[0.88rem] leading-relaxed text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
            <div className="h-full bg-navy-800 p-8 text-white">
              <CheckCircle2 className="h-8 w-8 text-crimson-400" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-xl">Due Diligence Coordination</h3>
              <p className="mt-2.5 text-[0.88rem] leading-relaxed text-white/75">
                SILA coordinates with qualified lawyers, surveyors, valuers, architects
                and relevant professionals where their expertise is required.
              </p>
            </div>
          </div>

          <Reveal>
            <div className="mt-8 flex items-start gap-3 border border-crimson-200 bg-crimson-50 p-6">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-crimson-600" />
              <p className="text-[0.86rem] leading-relaxed text-navy-800">
                <span className="font-semibold">Important: </span>
                {investmentDisclaimer}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Booking */}
      <section className="bg-sand-100 py-20 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <h2 className="h-display text-[2rem] leading-tight text-ink sm:text-[2.6rem]">
              Book an Investment Consultation
            </h2>
            <p className="mt-5 text-[1rem] leading-relaxed text-muted">
              Share your goals, budget and preferred locations, and a SILA advisor
              will prepare a tailored conversation about the opportunities and
              considerations most relevant to you.
            </p>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden">
              <Image
                src="/silo-image-7.jpg"
                alt="Invest in Zanzibar"
                fill
                sizes="(max-width:1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="border border-sand-300 bg-white p-7 shadow-card lg:p-8">
            <EnquiryForm context="an investment consultation" />
          </div>
        </div>
      </section>
    </>
  );
}
