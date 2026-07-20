import Image from "next/image";
import { MapPin } from "lucide-react";
import { ArchOutline } from "@/components/ui/Arch";
import type { TeamMember } from "@/lib/data";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function TeamCard({ member }: { member: TeamMember }) {
  const m = member;
  return (
    <article className="group flex flex-col overflow-hidden border border-sand-300 bg-white shadow-card transition-all duration-500 ease-silk hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative aspect-[4/5] overflow-hidden bg-navy-900">
        {m.image ? (
          <Image
            src={m.image}
            alt={m.name}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover transition-transform duration-[1.2s] ease-silk group-hover:scale-105"
          />
        ) : (
          // Branded monogram placeholder — replaced when a headshot is uploaded.
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-800 to-navy-950">
            <ArchOutline
              className="pointer-events-none absolute inset-0 mx-auto h-full w-auto text-white/[0.06]"
              strokeWidth={1.5}
            />
            <span className="font-display text-6xl leading-none text-white/90">
              {initials(m.name)}
            </span>
          </div>
        )}
        <span className="absolute left-3 top-3 bg-navy-950/70 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          {m.base}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl leading-snug text-ink">{m.name}</h3>
        <p className="mt-1 text-[0.82rem] font-semibold uppercase tracking-wide text-crimson-600">
          {m.title}
        </p>
        <p className="mt-2.5 flex items-center gap-1.5 text-[0.82rem] text-muted">
          <MapPin className="h-3.5 w-3.5 text-crimson-600" /> Based in {m.base}
        </p>
      </div>
    </article>
  );
}
