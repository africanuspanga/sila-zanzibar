"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn } from "@/lib/cn";

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const go = (dir: number) =>
    setActive((i) => (i + dir + images.length) % images.length);

  return (
    <>
      <div className="grid gap-2.5 sm:grid-cols-[1.6fr_1fr]">
        <button
          onClick={() => setOpen(true)}
          className="group relative aspect-[4/3] overflow-hidden sm:aspect-auto"
        >
          <Image
            src={images[active]}
            alt={title}
            fill
            priority
            sizes="(max-width:768px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 ease-silk group-hover:scale-[1.03]"
          />
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-navy-950/70 px-3 py-1.5 text-[0.72rem] font-medium text-white backdrop-blur">
            <Expand className="h-3.5 w-3.5" /> View gallery
          </span>
        </button>

        <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-2">
          {images.slice(0, 4).map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square overflow-hidden sm:aspect-[4/3]",
                active === i && "ring-2 ring-navy-800 ring-offset-2"
              )}
            >
              <Image src={src} alt={`${title} ${i + 1}`} fill sizes="200px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/95 p-4">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center text-white/80 hover:text-white"
          >
            <X className="h-7 w-7" />
          </button>
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-4 flex h-12 w-12 items-center justify-center text-white/70 hover:text-white sm:left-8"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <div className="relative h-[80vh] w-full max-w-5xl">
            <Image src={images[active]} alt={title} fill sizes="90vw" className="object-contain" />
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-4 flex h-12 w-12 items-center justify-center text-white/70 hover:text-white sm:right-8"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/70">
            {active + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
