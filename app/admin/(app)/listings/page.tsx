import Link from "next/link";
import { Plus, MapPin, ImageOff } from "lucide-react";
import { formatPrice, type Currency } from "@/lib/data";
import {
  listAll,
  type PropertyRow,
  type ProjectRow,
  type PlotRow,
  type ListingKind,
} from "@/lib/admin/listings";
import { isSupabaseAdminConfigured } from "@/lib/supabase/env";
import { PageHeader, Panel, EmptyState } from "@/components/admin/ui";
import { ListingActions } from "@/components/admin/ListingActions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function Thumb({ src, alt }: { src: string | null; alt: string }) {
  if (!src) {
    return (
      <span className="flex h-12 w-16 shrink-0 items-center justify-center rounded-lg bg-sand-200 text-muted">
        <ImageOff className="h-4 w-4" />
      </span>
    );
  }
  /* eslint-disable-next-line @next/next/no-img-element */
  return <img src={src} alt={alt} className="h-12 w-16 shrink-0 rounded-lg object-cover" />;
}

function Item({
  kind,
  id,
  title,
  image,
  location,
  price,
  published,
  badge,
}: {
  kind: ListingKind;
  id: string;
  title: string;
  image: string | null;
  location: string;
  price: string;
  published: boolean;
  badge?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-sand-100 py-3 last:border-0">
      <Thumb src={image} alt={title} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium text-navy-900">{title}</p>
          {!published ? (
            <span className="rounded-full bg-sand-200 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">
              Hidden
            </span>
          ) : null}
        </div>
        <p className="flex items-center gap-1 truncate text-xs text-muted">
          <MapPin className="h-3 w-3" /> {location}
        </p>
      </div>
      <div className="hidden text-right sm:block">
        <p className="text-sm font-medium text-navy-900">{price}</p>
        {badge ? <div className="mt-0.5">{badge}</div> : null}
      </div>
      <ListingActions kind={kind} id={id} published={published} editHref={`/admin/listings/${kind}/${id}`} />
    </div>
  );
}

function AddButton({ kind, label }: { kind: ListingKind; label: string }) {
  return (
    <Link
      href={`/admin/listings/${kind}/new`}
      className="inline-flex items-center gap-1.5 rounded-lg bg-navy-800 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-navy-900"
    >
      <Plus className="h-4 w-4" /> {label}
    </Link>
  );
}

export default async function ListingsPage() {
  if (!isSupabaseAdminConfigured) {
    return (
      <div>
        <PageHeader title="Listings" />
        <Panel>
          <EmptyState title="Backend not configured" hint="Set SUPABASE_SERVICE_ROLE_KEY to manage listings." />
        </Panel>
      </div>
    );
  }

  const [properties, projects, plots] = await Promise.all([
    listAll<PropertyRow>("property"),
    listAll<ProjectRow>("project"),
    listAll<PlotRow>("plot"),
  ]);

  return (
    <div>
      <PageHeader title="Listings" subtitle="Add, edit and publish properties, projects and plots. Changes go live on the site immediately." />

      <div className="space-y-4">
        <Panel title={`Properties (${properties.length})`} action={<AddButton kind="property" label="Add property" />}>
          {properties.length === 0 ? (
            <EmptyState title="No properties yet" hint="Add your first property to publish it on the site." />
          ) : (
            <div>
              {properties.map((p) => (
                <Item
                  key={p.id}
                  kind="property"
                  id={p.id}
                  title={p.title}
                  image={p.image}
                  location={p.location}
                  price={formatPrice(p.price, p.currency as Currency)}
                  published={p.published}
                  badge={
                    <span className="rounded-full bg-sand-100 px-2 py-0.5 text-xs text-navy-700">
                      {p.listing_type === "rent" ? "For rent" : "For sale"}
                    </span>
                  }
                />
              ))}
            </div>
          )}
        </Panel>

        <Panel title={`Projects (${projects.length})`} action={<AddButton kind="project" label="Add project" />}>
          {projects.length === 0 ? (
            <EmptyState title="No projects yet" />
          ) : (
            <div>
              {projects.map((d) => (
                <Item
                  key={d.id}
                  kind="project"
                  id={d.id}
                  title={d.name}
                  image={d.image}
                  location={d.location}
                  price={`from ${formatPrice(d.starting_price, d.currency as Currency)}`}
                  published={d.published}
                  badge={<span className="rounded-full bg-sand-100 px-2 py-0.5 text-xs text-navy-700">{d.status}</span>}
                />
              ))}
            </div>
          )}
        </Panel>

        <Panel title={`Plots (${plots.length})`} action={<AddButton kind="plot" label="Add plot" />}>
          {plots.length === 0 ? (
            <EmptyState title="No plots yet" />
          ) : (
            <div>
              {plots.map((pl) => (
                <Item
                  key={pl.id}
                  kind="plot"
                  id={pl.id}
                  title={pl.title}
                  image={pl.image}
                  location={pl.location}
                  price={formatPrice(pl.price, pl.currency as Currency)}
                  published={pl.published}
                  badge={<span className="rounded-full bg-sand-100 px-2 py-0.5 text-xs text-navy-700">{pl.size} sqm</span>}
                />
              ))}
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}
