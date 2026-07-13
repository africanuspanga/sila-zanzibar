"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/lib/data";
import { cn } from "@/lib/cn";

export function Faq({ items = faqs }: { items?: typeof faqs }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-20 lg:py-28">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow">
              <span className="h-px w-6 bg-current" /> Answers
            </span>
            <h2 className="h-display mt-4 text-[2.1rem] leading-[1.08] text-ink sm:text-[2.7rem]">
              Frequently Asked Questions
            </h2>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">
              Everything you need to know about buying, renting, building, listing
              and investing in Zanzibar property with SILA. Can&apos;t find your
              answer? Our team is a message away.
            </p>
          </div>

          <div className="divide-y divide-sand-300 border-y border-sand-300">
            {items.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={(i % 6) * 0.03}>
                  <div>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    >
                      <span
                        className={cn(
                          "font-display text-lg transition-colors sm:text-xl",
                          isOpen ? "text-navy-800" : "text-ink"
                        )}
                      >
                        {f.q}
                      </span>
                      <Plus
                        className={cn(
                          "h-5 w-5 shrink-0 text-crimson-600 transition-transform duration-300",
                          isOpen && "rotate-45"
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 pr-10 text-[0.92rem] leading-relaxed text-muted">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
