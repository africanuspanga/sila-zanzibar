import Link from "next/link";
import Image from "next/image";
import { Search, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ArchOutline } from "@/components/ui/Arch";
import { whatsappLink } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/silo-image-5.jpg"
        alt="Premium Zanzibar villa"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-navy-950/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/70" />
      <ArchOutline
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[440px] -translate-x-1/2 -translate-y-1/2 text-white/[0.05]"
        strokeWidth={1.5}
      />

      <div className="container-x relative py-24 text-center lg:py-32">
        <Reveal className="text-center">
          <span className="eyebrow-light">
            <span className="h-px w-6 bg-current" /> Your next chapter
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h-display mx-auto mt-5 max-w-3xl text-[2.4rem] leading-[1.05] text-white sm:text-[3.4rem]">
            Ready to Find Your Property in Zanzibar?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-[1.02rem] leading-relaxed text-white/75">
            Tell us what you are looking for and let SILA help you identify the right
            property, land, rental or investment opportunity.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/properties" className="btn-red group">
              <Search className="h-4 w-4" /> Start Your Property Search
            </Link>
            <a
              href={whatsappLink("Hello SILA, I'd like to start my Zanzibar property search.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-light"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
