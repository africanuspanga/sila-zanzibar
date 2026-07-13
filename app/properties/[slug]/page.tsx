import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin, BedDouble, Bath, Maximize, Trees, Sofa, CalendarClock,
  BadgeCheck, Phone, MessageCircle, Download, Check, ChevronRight, Hash,
} from "lucide-react";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ShareSave } from "@/components/property/ShareSave";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { properties, getProperty, formatPrice } from "@/lib/data";
import { site, whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) return { title: "Property not found" };
  return {
    title: `${p.title} — ${p.location}`,
    description: p.shortDescription,
    openGraph: { images: [p.image] },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) notFound();

  const related = properties
    .filter((x) => x.id !== p.id && (x.location === p.location || x.propertyType === p.propertyType))
    .slice(0, 3);

  const overview = [
    { icon: MapPin, label: "Type", value: p.propertyType },
    p.bedrooms != null && { icon: BedDouble, label: "Bedrooms", value: String(p.bedrooms) },
    p.bathrooms != null && { icon: Bath, label: "Bathrooms", value: String(p.bathrooms) },
    p.size != null && { icon: Maximize, label: "Built area", value: `${p.size} m²` },
    p.landSize != null && { icon: Trees, label: "Land size", value: `${p.landSize} m²` },
    { icon: Sofa, label: "Furnishing", value: p.furnished },
    { icon: CalendarClock, label: "Availability", value: "Available now" },
  ].filter(Boolean) as { icon: typeof MapPin; label: string; value: string }[];

  return (
    <>
      <div className="container-x pt-[92px] lg:pt-[104px]">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[0.78rem] text-muted">
          <Link href="/" className="hover:text-navy-800">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/properties" className="hover:text-navy-800">Properties</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-navy-800">{p.title}</span>
        </nav>

        {/* Title row */}
        <div className="mt-6 flex flex-col justify-between gap-5 border-b border-sand-300 pb-7 lg:flex-row lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-wider text-white ${p.listingType === "sale" ? "bg-crimson-600" : "bg-navy-800"}`}>
                {p.listingType === "sale" ? "For Sale" : "For Rent"}
              </span>
              {p.verified && (
                <span className="inline-flex items-center gap-1 border border-navy-800/20 px-2.5 py-1 text-[0.66rem] font-semibold text-navy-800">
                  <BadgeCheck className="h-3.5 w-3.5 text-crimson-600" /> Verified
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-[0.72rem] text-muted">
                <Hash className="h-3.5 w-3.5" /> {p.reference}
              </span>
            </div>
            <h1 className="h-display mt-3 text-[2.2rem] leading-tight text-ink sm:text-[2.8rem]">
              {p.title}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-muted">
              <MapPin className="h-4 w-4 text-crimson-600" /> {p.location}, Zanzibar
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <p className="font-display text-3xl text-navy-800">
              {formatPrice(p.price, p.currency)}
              {p.listingType === "rent" && (
                <span className="text-base font-normal text-muted">/{p.rentPeriod}</span>
              )}
            </p>
            <ShareSave title={p.title} />
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="container-x mt-8">
        <PropertyGallery images={p.gallery} title={p.title} />
      </div>

      {/* Body */}
      <div className="container-x mt-12 grid gap-12 pb-20 lg:grid-cols-[1fr_380px] lg:gap-16">
        <div>
          {/* Overview */}
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-sand-300 bg-sand-300 sm:grid-cols-3">
            {overview.map((o) => (
              <div key={o.label} className="bg-white p-5">
                <o.icon className="h-5 w-5 text-crimson-600" strokeWidth={1.5} />
                <p className="mt-3 text-[0.72rem] uppercase tracking-wide text-muted">{o.label}</p>
                <p className="mt-0.5 font-medium text-navy-800">{o.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mt-12">
            <h2 className="font-display text-2xl text-ink">Description</h2>
            <div className="mt-4 h-px w-14 bg-crimson-600" />
            <p className="mt-6 whitespace-pre-line text-[0.98rem] leading-relaxed text-muted">
              {p.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="mt-12">
            <h2 className="font-display text-2xl text-ink">Features &amp; Amenities</h2>
            <div className="mt-4 h-px w-14 bg-crimson-600" />
            <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {p.amenities.map((a) => (
                <li key={a} className="flex items-center gap-2.5 text-[0.9rem] text-navy-800">
                  <Check className="h-4 w-4 shrink-0 text-crimson-600" /> {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div className="mt-12">
            <h2 className="font-display text-2xl text-ink">Location</h2>
            <div className="mt-4 h-px w-14 bg-crimson-600" />
            <p className="mt-6 text-[0.95rem] leading-relaxed text-muted">
              This property is located in {p.location}, Zanzibar. For privacy, the
              precise location is shared once a viewing is arranged. Speak to a SILA
              advisor for nearby landmarks and approximate distances.
            </p>
            <div className="mt-5 flex items-center gap-3 border border-sand-300 bg-sand-50 p-5">
              <MapPin className="h-6 w-6 shrink-0 text-crimson-600" />
              <div>
                <p className="font-medium text-navy-800">{p.location}, Zanzibar</p>
                <p className="text-sm text-muted">Interactive map available on request.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky enquiry sidebar */}
        <aside>
          <div className="sticky top-24 space-y-4">
            <div className="border border-sand-300 bg-white p-6 shadow-card">
              <h3 className="font-display text-xl text-navy-800">Request a Viewing</h3>
              <p className="mt-1.5 text-sm text-muted">
                Enquire about {p.title}. A SILA advisor will respond promptly.
              </p>
              <div className="mt-5">
                <EnquiryForm context={`${p.title} (${p.reference})`} compact />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              <a
                href={whatsappLink(`Hello SILA, I'm interested in "${p.title}" (${p.reference}).`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Agent
              </a>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="btn-outline">
                <Phone className="h-4 w-4" /> Call SILA
              </a>
              <button className="btn-primary" type="button">
                <Download className="h-4 w-4" /> Download Brochure
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-sand-300 bg-sand-100 py-20">
          <div className="container-x">
            <h2 className="font-display text-3xl text-ink">Related Properties</h2>
            <p className="mt-2 text-muted">Similar opportunities you may like.</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <PropertyCard key={r.id} property={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
