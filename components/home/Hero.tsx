"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { SearchBox } from "./SearchBox";
import { ArchOutline } from "@/components/ui/Arch";

const typeLabels = ["Houses", "Apartments", "Villas", "Land", "Commercial"];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/silo-image.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/45 to-navy-950/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 to-transparent" />
      <ArchOutline
        className="pointer-events-none absolute -top-10 right-[6%] hidden h-[520px] w-[380px] text-white/[0.06] lg:block"
        strokeWidth={1.5}
      />

      <div className="container-x relative flex min-h-[92vh] flex-col justify-end pb-8 pt-32 lg:min-h-screen lg:pb-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-2"
          >
            {typeLabels.map((t) => (
              <span
                key={t}
                className={`border border-white/25 bg-white/5 px-3.5 py-1.5 text-[0.72rem] font-medium text-white/90 backdrop-blur-sm ${
                  t === "Villas" ? "hidden sm:inline-block" : ""
                }`}
              >
                {t}
              </span>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="h-display mt-6 text-[3rem] text-white sm:text-[4rem] lg:text-[5.2rem]"
          >
            Own Your Place
            <br />
            in <span className="italic text-white">Zanzibar</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-white/80"
          >
            Explore premium homes, investment properties, commercial spaces and
            carefully selected land across Zanzibar.
            <span className="hidden sm:inline">
              {" "}
              SILA provides trusted support from your first enquiry to the
              completion of your property journey.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-start"
          >
            <Link href="/properties" className="btn-red group w-full justify-center sm:w-auto">
              Explore Properties
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/investment-advisory" className="btn-ghost-light w-full justify-center sm:w-auto">
              <Phone className="h-4 w-4" /> Speak to an Advisor
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 lg:mt-14"
        >
          <SearchBox />
        </motion.div>
      </div>
    </section>
  );
}
