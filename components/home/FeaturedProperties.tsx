import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PropertyCard } from "@/components/property/PropertyCard";
import { featuredProperties } from "@/lib/data";

export function FeaturedProperties() {
  return (
    <section className="bg-sand-100 py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Featured"
            title="Featured Properties in Zanzibar"
            intro="Explore selected homes, rental properties, commercial spaces and investment opportunities available through SILA."
          />
          <Reveal delay={0.1}>
            <Link href="/properties" className="btn-outline group shrink-0">
              View All Properties
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.slice(0, 6).map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.06}>
              <PropertyCard property={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
