import type { Metadata } from "next";
import Link from "next/link";
import {
  Home, KeyRound, Megaphone, Hammer, Map, Compass, CalendarCheck, Users2, ArrowUpRight,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Connected real estate services for buyers, tenants, owners, developers, businesses and investors across Zanzibar.",
};

const services = [
  { icon: Home, title: "Property Sales", body: "Find residential, commercial, development and investment properties available for purchase.", href: "/properties" },
  { icon: KeyRound, title: "Property Rentals", body: "Find long-term and selected short-term rental opportunities across Zanzibar.", href: "/properties?listing=rent" },
  { icon: Megaphone, title: "Property Marketing", body: "Allow SILA to present and promote your property to potential clients.", href: "/list-your-property" },
  { icon: Hammer, title: "Build-to-Own Projects", body: "Secure selected properties during construction and pay according to an agreed schedule.", href: "/projects" },
  { icon: Map, title: "Plot & Land Sales", body: "Explore land suitable for homes, businesses, hospitality, development and investment.", href: "/plots" },
  { icon: Compass, title: "Investment Consultancy", body: "Structured guidance when comparing locations, property types, acquisition processes and development opportunities.", href: "/investment-advisory" },
  { icon: CalendarCheck, title: "Property Viewing Coordination", body: "Arrange property inspections with the SILA team.", href: "/contact" },
  { icon: Users2, title: "Professional Service Coordination", body: "Where required, SILA connects clients with lawyers, surveyors, valuers, architects, engineers, contractors and other qualified professionals.", href: "/contact" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        crumb="Services"
        title="Complete Property Services Under One Roof"
        intro="SILA provides connected real estate services for buyers, tenants, owners, developers, businesses and investors across Zanzibar."
        image="/silo-image.jpg"
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.05}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col border border-sand-300 bg-white p-7 transition-all duration-500 ease-silk hover:-translate-y-1 hover:border-navy-800 hover:shadow-card-hover"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-navy-800/5 text-navy-800 transition-colors group-hover:bg-navy-800 group-hover:text-white">
                    <s.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 font-display text-xl text-ink">{s.title}</h3>
                  <p className="mt-2.5 flex-1 text-[0.9rem] leading-relaxed text-muted">{s.body}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-crimson-600">
                    Learn more
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
