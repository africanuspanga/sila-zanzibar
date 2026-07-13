import Link from "next/link";
import { Quote, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArchOutline } from "@/components/ui/Arch";

const clientTypes = [
  "Property Buyer",
  "Tenant",
  "Property Owner",
  "Land Investor",
  "Development Buyer",
  "Commercial Client",
];

// Testimonials are intentionally not fabricated. This section ships ready for
// the admin to publish verified reviews; until then it presents an honest,
// premium empty state rather than fake names, photos or ratings.
export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
      <ArchOutline
        className="pointer-events-none absolute -bottom-24 left-[4%] hidden h-[420px] w-[300px] text-white/[0.04] lg:block"
        strokeWidth={1.5}
      />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Client voices"
          title="What Our Clients Say"
          intro="Real experiences from property buyers, tenants, owners and investors who have worked with SILA."
          align="center"
          tone="light"
        />

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl border border-white/15 bg-white/[0.03] p-10 text-center backdrop-blur-sm sm:p-14">
            <Quote className="mx-auto h-10 w-10 text-crimson-400" />
            <p className="mt-6 font-display text-2xl leading-snug text-white/90 sm:text-3xl">
              Verified client stories will appear here as SILA completes its first
              property journeys across Zanzibar.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              We publish only genuine, verified testimonials — no invented names,
              photographs or ratings. Work with us and your experience could be
              among the first we share.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {clientTypes.map((t) => (
                <span key={t} className="border border-white/20 px-3 py-1.5 text-[0.72rem] text-white/75">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-9">
              <Link href="/contact" className="btn-red">
                <ShieldCheck className="h-4 w-4" /> Become an early SILA client
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
