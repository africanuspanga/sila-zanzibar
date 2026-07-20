import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PlotCard } from "@/components/property/PlotCard";
import { Reveal } from "@/components/ui/Reveal";
import { getPlots } from "@/lib/content";

export const metadata: Metadata = {
  title: "Land & Plots for Sale in Zanzibar",
  description:
    "Explore clearly defined plots for residential, commercial, hospitality, agricultural and long-term investment purposes across Zanzibar.",
  alternates: { canonical: "/plots" },
};

export const revalidate = 300;

const categories = [
  "Residential plots",
  "Commercial plots",
  "Tourism development land",
  "Beach-area plots",
  "Agricultural land",
  "Large investment land",
  "Subdivided development plots",
];

export default async function PlotsPage() {
  const plots = await getPlots();
  return (
    <>
      <PageHero
        eyebrow="Plots"
        crumb="Plots"
        title="Land for Your Next Move"
        intro="Purchase a clearly defined plot for residential, commercial, hospitality, agricultural or long-term investment purposes. SILA helps you compare locations, sizes, accessibility, intended use and documentation before proceeding."
        image="/silo-image-3.jpg"
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="container-x">
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((c) => (
              <span key={c} className="border border-sand-300 px-3 py-1.5 text-[0.75rem] text-navy-800">
                {c}
              </span>
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {plots.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.06}>
                <PlotCard plot={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
