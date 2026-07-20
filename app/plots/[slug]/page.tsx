import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin, Maximize, Route, Zap, Droplet, FileText, Ruler,
  Compass, ChevronRight, MessageCircle, Check,
} from "lucide-react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { formatPrice } from "@/lib/data";
import { getPlots, getPlotBySlug } from "@/lib/content";
import { whatsappLink } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  const list = await getPlots();
  return list.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPlotBySlug(slug);
  if (!p) return { title: "Plot not found" };
  return {
    title: `${p.title} — ${p.location}`,
    description: p.description,
    alternates: { canonical: `/plots/${p.slug}` },
  };
}

export default async function PlotDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getPlotBySlug(slug);
  if (!p) notFound();

  const facts = [
    { icon: Maximize, label: "Plot size", value: `${p.size.toLocaleString()} m²` },
    { icon: Compass, label: "Intended use", value: p.use },
    { icon: Route, label: "Road access", value: p.roadAccess ? "Yes" : "No" },
    { icon: Ruler, label: "From main road", value: p.distanceFromRoad },
    ...(p.distanceFromBeach ? [{ icon: MapPin, label: "From beach", value: p.distanceFromBeach }] : []),
    { icon: FileText, label: "Documentation", value: p.docStatus },
  ];

  const utilities = [
    { icon: Zap, label: "Electricity", available: p.electricity },
    { icon: Droplet, label: "Water", available: p.water },
    { icon: Route, label: "Road access", available: p.roadAccess },
  ];

  return (
    <>
      <div className="container-x pt-[96px] lg:pt-[110px]">
        <nav className="flex items-center gap-1.5 text-[0.78rem] text-muted">
          <Link href="/" className="hover:text-navy-800">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/plots" className="hover:text-navy-800">Plots</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-navy-800">{p.title}</span>
        </nav>

        <div className="mt-6 flex flex-col justify-between gap-4 border-b border-sand-300 pb-7 lg:flex-row lg:items-end">
          <div>
            <span className="inline-flex w-fit items-center bg-navy-800 px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-wider text-white">
              {p.use.split("/")[0].trim()}
            </span>
            <h1 className="h-display mt-3 text-[2.2rem] leading-tight text-ink sm:text-[2.9rem]">
              {p.title}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-muted">
              <MapPin className="h-4 w-4 text-crimson-600" /> {p.location}, Zanzibar
            </p>
          </div>
          <p className="font-display text-3xl text-navy-800">
            {formatPrice(p.price, p.currency)}
            {p.pricePerSqm && (
              <span className="block text-sm font-normal text-muted">
                {formatPrice(p.pricePerSqm, p.currency)} per m²
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="container-x mt-8">
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <Image src={p.image} alt={p.title} fill priority sizes="100vw" className="object-cover" />
        </div>
      </div>

      <div className="container-x mt-12 grid gap-12 pb-20 lg:grid-cols-[1fr_380px] lg:gap-16">
        <div>
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-sand-300 bg-sand-300 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label} className="bg-white p-5">
                <f.icon className="h-5 w-5 text-crimson-600" strokeWidth={1.5} />
                <p className="mt-3 text-[0.72rem] uppercase tracking-wide text-muted">{f.label}</p>
                <p className="mt-0.5 text-sm font-medium text-navy-800">{f.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="font-display text-2xl text-ink">About This Plot</h2>
            <div className="mt-4 h-px w-14 bg-crimson-600" />
            <p className="mt-6 text-[0.98rem] leading-relaxed text-muted">{p.description}</p>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-2xl text-ink">Utilities &amp; Access</h2>
            <div className="mt-4 h-px w-14 bg-crimson-600" />
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {utilities.map((u) => (
                <div
                  key={u.label}
                  className={`flex items-center gap-3 border p-4 ${u.available ? "border-navy-800/20 bg-navy-800/[0.03]" : "border-sand-300 bg-sand-50"}`}
                >
                  <u.icon className={`h-5 w-5 ${u.available ? "text-navy-800" : "text-sand-500"}`} strokeWidth={1.5} />
                  <div>
                    <p className="text-[0.85rem] font-medium text-navy-800">{u.label}</p>
                    <p className={`text-xs ${u.available ? "text-navy-600" : "text-muted"}`}>
                      {u.available ? "Available" : "Not available"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-2xl text-ink">Documentation &amp; Due Diligence</h2>
            <div className="mt-4 h-px w-14 bg-crimson-600" />
            <div className="mt-6 flex items-start gap-3 border border-sand-300 bg-sand-50 p-6">
              <FileText className="mt-0.5 h-6 w-6 shrink-0 text-crimson-600" />
              <div>
                <p className="font-medium text-navy-800">{p.docStatus}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  SILA can perform an initial internal review and coordinate due
                  diligence. Final legal verification should be completed by qualified
                  professionals and the relevant Zanzibar authorities before any
                  transaction is completed.
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside>
          <div className="sticky top-24 space-y-4">
            <div className="border border-sand-300 bg-white p-6 shadow-card">
              <h3 className="font-display text-xl text-navy-800">Enquire About This Plot</h3>
              <p className="mt-1.5 text-sm text-muted">
                Request documentation, a site visit or a location map for {p.title}.
              </p>
              <div className="mt-5">
                <EnquiryForm context={`the plot "${p.title}" in ${p.location}`} source="plot_enquiry" compact />
              </div>
            </div>
            <a
              href={whatsappLink(`Hello SILA, I'm interested in the plot "${p.title}" in ${p.location}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp About This Plot
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
