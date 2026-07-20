import Link from "next/link";
import Image from "next/image";
import { MapPin, Navigation } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatPrice } from "@/lib/data";
import { getFeaturedProperties } from "@/lib/content";

// Illustrative markers positioned over an aerial image. A live, clustered map
// (Google/Mapbox) plugs into this section once an API key is configured.
const markers = [
  { top: "28%", left: "22%" },
  { top: "44%", left: "58%" },
  { top: "62%", left: "34%" },
  { top: "36%", left: "78%" },
  { top: "70%", left: "68%" },
];

const filters = ["Property type", "Sale / Rent", "Price range", "Bedrooms", "Build-to-own", "Land", "Commercial", "Beachfront"];

export async function MapPreview() {
  const featuredProperties = await getFeaturedProperties();
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Explore the island"
          title="Explore Property Opportunities Across Zanzibar"
          intro="Search properties by location and discover homes, developments, commercial spaces and land opportunities across the island."
          align="center"
        />

        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden border border-sand-300 shadow-card">
            <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
              <Image
                src="/silo-image-3.jpg"
                alt="Map of Zanzibar property opportunities"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-navy-950/25" />

              {markers.map((m, i) => {
                const p = featuredProperties[i % featuredProperties.length];
                return (
                  <div
                    key={i}
                    className="group absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ top: m.top, left: m.left }}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-crimson-600 text-white shadow-float ring-4 ring-white/40 transition-transform group-hover:scale-110">
                      <MapPin className="h-[18px] w-[18px]" />
                    </span>
                    <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-44 -translate-x-1/2 scale-95 border border-sand-300 bg-white p-2 opacity-0 shadow-float transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                      <div className="relative mb-2 aspect-[16/10] overflow-hidden">
                        <Image src={p.image} alt={p.title} fill sizes="180px" className="object-cover" />
                      </div>
                      <p className="text-[0.72rem] font-semibold text-navy-800">{p.title}</p>
                      <p className="text-[0.72rem] text-crimson-600">
                        {formatPrice(p.price, p.currency)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 border-t border-sand-300 bg-sand-50 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="no-scrollbar flex gap-2 overflow-x-auto">
                {filters.map((f) => (
                  <span
                    key={f}
                    className="shrink-0 whitespace-nowrap border border-sand-300 bg-white px-3 py-1.5 text-[0.72rem] text-navy-800"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <Link href="/properties" className="btn-primary shrink-0">
                <Navigation className="h-4 w-4" /> Find Nearest Properties
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
