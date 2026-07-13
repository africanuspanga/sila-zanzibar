import { Reveal } from "@/components/ui/Reveal";
import { commitments } from "@/lib/data";

export function Commitments() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-x">
        <div className="grid gap-px overflow-hidden border border-sand-300 bg-sand-300 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.06}>
              <div className="group h-full bg-white p-8 transition-colors duration-500 hover:bg-navy-800">
                <span className="font-display text-5xl text-crimson-600 transition-colors group-hover:text-crimson-400">
                  {c.n}
                </span>
                <h3 className="mt-5 font-display text-xl text-navy-800 transition-colors group-hover:text-white">
                  {c.title}
                </h3>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-muted transition-colors group-hover:text-white/70">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-muted">
          Operational commitments shown while SILA&apos;s verified performance data is
          being finalised.
        </p>
      </div>
    </section>
  );
}
