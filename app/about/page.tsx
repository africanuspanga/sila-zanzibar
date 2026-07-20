import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Handshake, Award, Compass, Briefcase, Users, TrendingUp } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ArchImage } from "@/components/ui/Arch";

export const metadata: Metadata = {
  title: "About SILA",
  description:
    "SILA is a Zanzibar-based real estate developer and investor, helping individuals, families, businesses and investors buy, rent, build, develop and invest in property and land across Zanzibar and mainland Tanzania.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: Handshake, title: "Trust", body: "We communicate clearly and act responsibly throughout every property engagement." },
  { icon: Award, title: "Quality", body: "We aim to present properties and opportunities that meet appropriate standards." },
  { icon: Compass, title: "Local Knowledge", body: "We combine market awareness with practical understanding of Zanzibar's locations and property environment." },
  { icon: Briefcase, title: "Professionalism", body: "We handle enquiries, listings, viewings, documentation and communication with care." },
  { icon: Users, title: "Client Focus", body: "We begin by understanding what each client wants to achieve." },
  { icon: TrendingUp, title: "Long-Term Value", body: "We look beyond immediate transactions and consider how property decisions may support future goals." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        crumb="About Us"
        title="Real Estate Built Around Trust"
        image="/silo-image-2.jpg"
      />

      {/* Intro */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <span className="eyebrow"><span className="h-px w-6 bg-current" /> Who we are</span>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-6 text-[1.15rem] leading-relaxed text-navy-800">
                SILA is a real estate developer and investor based in Zanzibar,
                helping individuals, families, businesses and investors buy, rent,
                build, develop and invest in property and land across the island and
                mainland Tanzania.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[1rem] leading-relaxed text-muted">
                As both a developer and an investor, we don&apos;t simply list
                properties — we create them and put our own conviction behind them.
                From build-to-own homes and residential projects to plot sales, owner
                listings and land investment advisory, SILA brings property,
                development and investment together under one trusted partner — with
                the goal of making owning, building and investing in Zanzibar clearer,
                more professional and more rewarding.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ArchImage
              src="/silo-image-5.jpg"
              alt="SILA Real Estate in Zanzibar"
              className="aspect-[4/5] w-full"
              sizes="(max-width:1024px) 100vw, 45vw"
            />
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-navy-950 py-20 text-white lg:py-24">
        <div className="container-x grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
          <div className="bg-navy-950 p-10 lg:p-12">
            <span className="eyebrow-light"><span className="h-px w-6 bg-current" /> Our Mission</span>
            <p className="mt-5 font-display text-2xl leading-snug text-white sm:text-[1.7rem]">
              To make property ownership, rental, development and investment in Zanzibar
              clearer, more professional and more accessible.
            </p>
          </div>
          <div className="bg-navy-950 p-10 lg:p-12">
            <span className="eyebrow-light"><span className="h-px w-6 bg-current" /> Our Vision</span>
            <p className="mt-5 font-display text-2xl leading-snug text-white sm:text-[1.7rem]">
              To become one of Zanzibar&apos;s most trusted premium real estate companies —
              recognised for quality opportunities, local expertise, responsible guidance
              and long-term client relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="bg-white py-20 lg:py-28">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow"><span className="h-px w-6 bg-current" /> What we stand for</span>
            <h2 className="h-display mt-4 text-[2.1rem] leading-tight text-ink sm:text-[2.7rem]">
              Our Values
            </h2>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 0.05}>
                <div className="border-t border-sand-300 pt-6">
                  <v.icon className="h-7 w-7 text-crimson-600" strokeWidth={1.5} />
                  <h3 className="mt-4 font-display text-xl text-navy-800">{v.title}</h3>
                  <p className="mt-2.5 text-[0.9rem] leading-relaxed text-muted">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 flex flex-col items-start justify-between gap-6 border border-sand-300 bg-sand-100 p-8 sm:flex-row sm:items-center lg:p-10">
              <div>
                <h3 className="font-display text-2xl text-navy-800">Ready to work with SILA?</h3>
                <p className="mt-1.5 text-muted">Explore our services or speak to our team today.</p>
              </div>
              <div className="flex gap-3">
                <Link href="/services" className="btn-outline">Our Services</Link>
                <Link href="/contact" className="btn-red group">
                  Contact Us
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
