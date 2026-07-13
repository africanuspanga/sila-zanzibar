"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BedDouble, Bath, Maximize, MapPin, BadgeCheck, Heart, MessageCircle } from "lucide-react";
import { type Property, formatPrice } from "@/lib/data";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/cn";

export function PropertyCard({ property }: { property: Property }) {
  const [saved, setSaved] = useState(false);
  const p = property;

  return (
    <article className="group relative flex flex-col overflow-hidden border border-sand-300 bg-white shadow-card transition-all duration-500 ease-silk hover:-translate-y-1 hover:shadow-card-hover">
      <Link href={`/properties/${p.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={p.image}
          alt={p.title}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1.2s] ease-silk group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-transparent opacity-70" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span
            className={cn(
              "px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-wider text-white",
              p.listingType === "sale" ? "bg-crimson-600" : "bg-navy-800"
            )}
          >
            {p.listingType === "sale" ? "For Sale" : "For Rent"}
          </span>
          {p.beachfront && (
            <span className="bg-white/90 px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-wider text-navy-800">
              Beachfront
            </span>
          )}
          {p.newDevelopment && (
            <span className="bg-white/90 px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-wider text-navy-800">
              New
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            setSaved((v) => !v);
          }}
          aria-label={saved ? "Remove from saved" : "Save property"}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-white/90 text-navy-800 backdrop-blur transition-colors hover:bg-white"
        >
          <Heart className={cn("h-[18px] w-[18px]", saved && "fill-crimson-600 text-crimson-600")} />
        </button>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="text-lg font-semibold text-navy-800">
            {formatPrice(p.price, p.currency)}
            {p.listingType === "rent" && (
              <span className="text-xs font-normal text-muted">/{p.rentPeriod}</span>
            )}
          </p>
          {p.verified && (
            <span className="inline-flex items-center gap-1 text-[0.68rem] font-semibold text-navy-600">
              <BadgeCheck className="h-4 w-4 text-crimson-600" /> Verified
            </span>
          )}
        </div>

        <h3 className="font-display text-xl leading-snug text-ink">
          <Link href={`/properties/${p.slug}`} className="transition-colors hover:text-navy-700">
            {p.title}
          </Link>
        </h3>

        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="h-4 w-4 text-crimson-600" /> {p.location}
          <span className="text-sand-400">·</span>
          <span>{p.propertyType}</span>
        </p>

        <p className="mt-3 line-clamp-2 text-[0.86rem] leading-relaxed text-muted">
          {p.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-sand-200 pt-4 text-[0.8rem] text-navy-800">
          {p.bedrooms != null && (
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="h-4 w-4 text-muted" /> {p.bedrooms} Bed
            </span>
          )}
          {p.bathrooms != null && (
            <span className="inline-flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-muted" /> {p.bathrooms} Bath
            </span>
          )}
          {p.size != null && (
            <span className="inline-flex items-center gap-1.5">
              <Maximize className="h-4 w-4 text-muted" /> {p.size} m²
            </span>
          )}
        </div>

        <div className="mt-5 flex gap-2">
          <Link
            href={`/properties/${p.slug}`}
            className="flex-1 bg-navy-800 py-2.5 text-center text-[0.8rem] font-semibold text-white transition-colors hover:bg-navy-900"
          >
            View Details
          </Link>
          <a
            href={whatsappLink(`Hello SILA, I'm interested in "${p.title}" (${p.reference}).`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enquire on WhatsApp"
            className="flex h-[42px] w-[46px] items-center justify-center border border-sand-300 text-[#25D366] transition-colors hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        </div>
      </div>
    </article>
  );
}
