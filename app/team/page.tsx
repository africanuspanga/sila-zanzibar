import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { TeamCard } from "@/components/team/TeamCard";
import { getTeam } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the SILA team — property, development and investment professionals across Zanzibar and mainland Tanzania.",
  alternates: { canonical: "/team" },
};

const groups = [
  { base: "Zanzibar" as const, label: "Zanzibar" },
  { base: "Mainland Tanzania" as const, label: "Mainland Tanzania" },
];

export const revalidate = 300;

export default async function TeamPage() {
  const team = await getTeam();
  return (
    <>
      <PageHero
        eyebrow="Our Team"
        crumb="Team"
        title="The People Behind SILA"
        intro="A team of property, development and investment professionals across Zanzibar and mainland Tanzania, working to make owning, building and investing on the island clearer and more rewarding."
        image="/silo-image-3.jpg"
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="container-x space-y-16 lg:space-y-20">
          {groups.map((group) => {
            const members = team.filter((m) => m.base === group.base);
            if (members.length === 0) return null;
            return (
              <div key={group.base}>
                <div className="flex items-end justify-between gap-6 border-b border-sand-300 pb-5">
                  <div>
                    <span className="eyebrow">
                      <span className="h-px w-6 bg-current" /> {group.label}
                    </span>
                    <h2 className="mt-3 font-display text-2xl text-navy-800 sm:text-3xl">
                      {group.base} Team
                    </h2>
                  </div>
                  <span className="hidden text-sm text-muted sm:block">
                    {members.length}{" "}
                    {members.length === 1 ? "member" : "members"}
                  </span>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {members.map((m, i) => (
                    <Reveal key={m.id} delay={(i % 3) * 0.06}>
                      <TeamCard member={m} />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}

          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 border border-sand-300 bg-sand-100 p-8 sm:flex-row sm:items-center lg:p-10">
              <div>
                <h3 className="font-display text-2xl text-navy-800">
                  Want to work with our team?
                </h3>
                <p className="mt-1.5 text-muted">
                  Speak to a SILA advisor about buying, building or investing in
                  Zanzibar.
                </p>
              </div>
              <Link href="/contact" className="btn-red group">
                Contact Us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
