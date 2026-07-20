import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { DevelopmentCard } from "@/components/property/DevelopmentCard";
import { Reveal } from "@/components/ui/Reveal";
import { buildSteps } from "@/lib/data";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects in Zanzibar",
  description:
    "Explore SILA's build-to-own projects and developments across Zanzibar. Secure a property during construction and pay according to an agreed installment schedule.",
  alternates: { canonical: "/projects" },
};

export const revalidate = 300;

export default async function ProjectsPage() {
  const developments = await getProjects();
  return (
    <>
      <PageHero
        eyebrow="Projects"
        crumb="Projects"
        title="Build Today. Own Tomorrow."
        intro="Secure selected properties during construction and pay according to an agreed installment schedule. On completion, the finished property is transferred under the applicable agreement and legal process."
        image="/silo-image-5.jpg"
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {developments.map((d, i) => (
              <Reveal key={d.id} delay={(i % 3) * 0.06}>
                <DevelopmentCard development={d} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="payment-plan" className="bg-navy-950 py-20 text-white lg:py-24">
        <div className="container-x">
          <h2 className="h-display text-[2rem] text-white sm:text-[2.6rem]">
            How Build-to-Own Works
          </h2>
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {buildSteps.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.06}>
                <div>
                  <span className="font-display text-4xl text-white/25">{s.step}</span>
                  <div className="mt-3 h-px w-full bg-white/15">
                    <div className="h-px w-1/2 bg-crimson-500" />
                  </div>
                  <h3 className="mt-4 font-display text-lg text-white">{s.title}</h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-white/60">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <Link href="/contact" className="btn-red group">
              Request a Payment Plan
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
