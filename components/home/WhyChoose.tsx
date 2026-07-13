import Image from "next/image";
import { ShieldCheck, MapPinned, Globe2, FileText, Layers, HeartHandshake } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { whyChoose } from "@/lib/data";

const icons = [ShieldCheck, MapPinned, Globe2, FileText, Layers, HeartHandshake];

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
      <Image
        src="/silo-image-2.jpg"
        alt=""
        fill
        className="object-cover opacity-[0.12]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy-950/60" />

      <div className="container-x relative">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow-light">
              <span className="h-px w-6 bg-current" /> Why SILA
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-display mt-4 text-[2.1rem] leading-[1.1] text-white sm:text-[2.9rem]">
              Local Knowledge. Premium Opportunities. Trusted Support.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((f, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={f.title} delay={i * 0.05}>
                <div className="group border-t border-white/15 pt-6">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-crimson-400" strokeWidth={1.5} />
                    <span className="text-xs font-semibold tracking-brand text-white/40">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl text-white">{f.title}</h3>
                  <p className="mt-2.5 text-[0.9rem] leading-relaxed text-white/65">
                    {f.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
