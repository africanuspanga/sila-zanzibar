import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { type Development, formatPrice } from "@/lib/data";

const statusColor: Record<Development["status"], string> = {
  Planning: "bg-navy-600",
  "Under Construction": "bg-crimson-600",
  "Nearing Completion": "bg-amber-500",
  Ready: "bg-emerald-600",
};

export function DevelopmentCard({ development }: { development: Development }) {
  const d = development;
  return (
    <article className="group flex flex-col overflow-hidden border border-sand-300 bg-white shadow-card transition-all duration-500 ease-silk hover:-translate-y-1 hover:shadow-card-hover">
      <Link href={`/developments/${d.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <Image
          src={d.image}
          alt={d.name}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[1.2s] ease-silk group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 to-transparent" />
        <span className={`absolute left-3 top-3 px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-wider text-white ${statusColor[d.status]}`}>
          {d.status}
        </span>
        <div className="absolute inset-x-4 bottom-4">
          <div className="mb-1.5 flex items-center justify-between text-[0.72rem] font-medium text-white">
            <span>Completion</span>
            <span>{d.completionPercent}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden bg-white/25">
            <div className="h-full bg-white" style={{ width: `${d.completionPercent}%` }} />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.72rem] font-semibold uppercase tracking-wider text-muted">
          From <span className="text-navy-800">{formatPrice(d.startingPrice, d.currency)}</span> · Est. {d.estCompletion}
        </p>
        <h3 className="mt-1.5 font-display text-xl leading-snug text-ink">
          <Link href={`/developments/${d.slug}`} className="transition-colors hover:text-navy-700">
            {d.name}
          </Link>
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="h-4 w-4 text-crimson-600" /> {d.location}
        </p>
        <p className="mt-3 flex-1 line-clamp-2 text-[0.86rem] leading-relaxed text-muted">
          {d.shortDescription}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {d.unitTypes.slice(0, 3).map((u) => (
            <span key={u} className="bg-sand-100 px-2.5 py-1 text-[0.68rem] text-navy-800">
              {u}
            </span>
          ))}
        </div>
        <Link
          href={`/developments/${d.slug}`}
          className="group/btn mt-5 inline-flex items-center justify-between border border-sand-300 px-4 py-2.5 text-[0.8rem] font-semibold text-navy-800 transition-colors hover:border-navy-800 hover:bg-navy-800 hover:text-white"
        >
          View Development
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
