import Image from "next/image";
import Link from "next/link";
import { MapPin, Maximize, Zap, Droplet, Route, ArrowUpRight } from "lucide-react";
import { type Plot, formatPrice } from "@/lib/data";

export function PlotCard({ plot }: { plot: Plot }) {
  return (
    <article className="group flex flex-col overflow-hidden border border-sand-300 bg-white shadow-card transition-all duration-500 ease-silk hover:-translate-y-1 hover:shadow-card-hover">
      <Link href={`/plots/${plot.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <Image
          src={plot.image}
          alt={plot.title}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[1.2s] ease-silk group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 bg-navy-800 px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-wider text-white">
          {plot.use.split("/")[0].trim()}
        </span>
        <span className="absolute bottom-3 right-3 bg-white/90 px-2.5 py-1 text-[0.72rem] font-semibold text-navy-800 backdrop-blur">
          {plot.size.toLocaleString()} m²
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-lg font-semibold text-navy-800">
          {formatPrice(plot.price, plot.currency)}
          {plot.pricePerSqm && (
            <span className="ml-1.5 text-xs font-normal text-muted">
              · {formatPrice(plot.pricePerSqm, plot.currency)}/m²
            </span>
          )}
        </p>
        <h3 className="mt-1.5 font-display text-xl leading-snug text-ink">
          <Link href={`/plots/${plot.slug}`} className="transition-colors hover:text-navy-700">
            {plot.title}
          </Link>
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="h-4 w-4 text-crimson-600" /> {plot.location}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-sand-200 pt-4 text-[0.78rem] text-navy-800">
          <span className="inline-flex items-center gap-1.5">
            <Maximize className="h-4 w-4 text-muted" /> {plot.size.toLocaleString()} m²
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Route className="h-4 w-4 text-muted" /> {plot.roadAccess ? "Road access" : "No road"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-muted" /> {plot.electricity ? "Power" : "No power"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Droplet className="h-4 w-4 text-muted" /> {plot.water ? "Water" : "No water"}
          </span>
        </div>

        <Link
          href={`/plots/${plot.slug}`}
          className="group/btn mt-5 inline-flex items-center justify-between border border-sand-300 px-4 py-2.5 text-[0.8rem] font-semibold text-navy-800 transition-colors hover:border-navy-800 hover:bg-navy-800 hover:text-white"
        >
          View Plot Details
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
