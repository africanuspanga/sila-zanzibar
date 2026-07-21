import Link from "next/link";
import { MapPin, ExternalLink } from "lucide-react";
import { getProperties, getProjects, getPlots } from "@/lib/content";
import { formatPrice } from "@/lib/data";
import { PageHeader, Panel, StatusBadge, Chip, EmptyState } from "@/components/admin/ui";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function Thumb({ label }: { label: string }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-navy-700 to-navy-900 text-sm font-semibold text-white">
      {(label || "?").slice(0, 1).toUpperCase()}
    </span>
  );
}

function Row({
  href,
  title,
  location,
  price,
  badge,
}: {
  href: string;
  title: string;
  location: string;
  price: string;
  badge: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-sand-100 py-3 last:border-0">
      <Thumb label={title} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-navy-900">{title}</p>
        <p className="flex items-center gap-1 truncate text-xs text-muted">
          <MapPin className="h-3 w-3" /> {location}
        </p>
      </div>
      <div className="hidden text-right sm:block">
        <p className="text-sm font-medium text-navy-900">{price}</p>
        <div className="mt-0.5">{badge}</div>
      </div>
      <Link
        href={href}
        target="_blank"
        className="inline-flex items-center gap-1 rounded-lg border border-sand-300 px-2.5 py-1.5 text-xs text-navy-700 transition hover:bg-sand-100"
      >
        View <ExternalLink className="h-3 w-3" />
      </Link>
    </div>
  );
}

export default async function ListingsPage() {
  const [properties, projects, plots] = await Promise.all([getProperties(), getProjects(), getPlots()]);

  return (
    <div>
      <PageHeader
        title="Listings"
        subtitle="Published properties, projects and plots. Edit content in the Supabase Table Editor."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title={`Properties (${properties.length})`}>
          {properties.length === 0 ? (
            <EmptyState title="No properties" />
          ) : (
            <div>
              {properties.map((p) => (
                <Row
                  key={p.slug}
                  href={`/properties/${p.slug}`}
                  title={p.title}
                  location={p.location}
                  price={formatPrice(p.price, p.currency)}
                  badge={<Chip>{p.listingType === "rent" ? "For rent" : "For sale"}</Chip>}
                />
              ))}
            </div>
          )}
        </Panel>

        <Panel title={`Projects (${projects.length})`}>
          {projects.length === 0 ? (
            <EmptyState title="No projects" />
          ) : (
            <div>
              {projects.map((d) => (
                <Row
                  key={d.slug}
                  href={`/projects/${d.slug}`}
                  title={d.name}
                  location={d.location}
                  price={`from ${formatPrice(d.startingPrice, d.currency)}`}
                  badge={<StatusBadge status={d.status} />}
                />
              ))}
            </div>
          )}
        </Panel>

        <Panel title={`Plots (${plots.length})`} className="lg:col-span-2">
          {plots.length === 0 ? (
            <EmptyState title="No plots" />
          ) : (
            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
              {plots.map((pl) => (
                <Row
                  key={pl.slug}
                  href={`/plots/${pl.slug}`}
                  title={pl.title}
                  location={pl.location}
                  price={formatPrice(pl.price, pl.currency)}
                  badge={<Chip>{pl.size} sqm</Chip>}
                />
              ))}
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}
