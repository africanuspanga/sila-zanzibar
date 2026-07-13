import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const provides = [
  "Listing preparation",
  "Professional photography",
  "Description writing",
  "Website marketing",
  "Social media promotion",
  "Buyer & tenant enquiries",
  "Viewing coordination",
  "Transaction support",
];

export function ListPropertyCta() {
  return (
    <section className="bg-sand-100 py-20 lg:py-28">
      <div className="container-x">
        <div className="grid overflow-hidden border border-sand-300 bg-white shadow-card lg:grid-cols-2">
          <Reveal className="relative min-h-[320px]">
            <Image
              src="/silo-image-7.jpg"
              alt="List your Zanzibar property with SILA"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
          </Reveal>

          <div className="p-8 sm:p-12">
            <Reveal>
              <span className="eyebrow">
                <span className="h-px w-6 bg-current" /> For property owners
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-display mt-4 text-[2rem] leading-[1.1] text-ink sm:text-[2.5rem]">
                Let SILA Market Your Property
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-muted">
                Own a house, apartment, villa, office, commercial building, plot or
                land in Zanzibar? List it with SILA and allow our team to
                professionally present it to potential buyers, tenants and investors.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {provides.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[0.86rem] text-navy-800">
                    <Check className="h-4 w-4 shrink-0 text-crimson-600" /> {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <Link href="/list-your-property" className="btn-red group mt-8">
                Submit Your Property
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
