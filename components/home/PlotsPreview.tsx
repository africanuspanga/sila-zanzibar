import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlotCard } from "@/components/property/PlotCard";
import { getPlots } from "@/lib/content";

const categories = [
  "Residential plots",
  "Commercial plots",
  "Tourism development land",
  "Beach-area plots",
  "Agricultural land",
  "Large investment land",
  "Subdivided development plots",
];

export async function PlotsPreview() {
  const plots = await getPlots();
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Plot Sales"
              title="Land for Your Next Move"
              intro="Purchase a clearly defined plot for residential, commercial, hospitality, agricultural or long-term investment purposes. SILA helps clients compare locations, plot sizes, accessibility, intended land use and available documentation before proceeding."
            />
            <Reveal delay={0.15}>
              <ul className="mt-7 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <li
                    key={c}
                    className="border border-sand-300 px-3 py-1.5 text-[0.75rem] text-navy-800"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <Link href="/plots" className="btn-primary group mt-8">
                Explore Available Land
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {plots.slice(0, 2).map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <PlotCard plot={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
