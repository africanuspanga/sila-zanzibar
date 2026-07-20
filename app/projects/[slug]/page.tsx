import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin, CalendarClock, Wallet, Building2, Check, ChevronRight,
  MessageCircle, HardHat, Layers,
} from "lucide-react";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { formatPrice } from "@/lib/data";
import { getProjects, getProjectBySlug } from "@/lib/content";
import { whatsappLink } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  const list = await getProjects();
  return list.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = await getProjectBySlug(slug);
  if (!d) return { title: "Project not found" };
  return {
    title: `${d.name} — ${d.location}`,
    description: d.shortDescription,
    alternates: { canonical: `/projects/${d.slug}` },
  };
}

export default async function DevelopmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = await getProjectBySlug(slug);
  if (!d) notFound();

  const facts = [
    { icon: MapPin, label: "Location", value: d.location },
    { icon: HardHat, label: "Status", value: d.status },
    { icon: CalendarClock, label: "Est. completion", value: d.estCompletion },
    { icon: Wallet, label: "Starting price", value: formatPrice(d.startingPrice, d.currency) },
  ];

  return (
    <>
      <div className="container-x pt-[96px] lg:pt-[110px]">
        <nav className="flex items-center gap-1.5 text-[0.78rem] text-muted">
          <Link href="/" className="hover:text-navy-800">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/projects" className="hover:text-navy-800">Projects</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-navy-800">{d.name}</span>
        </nav>

        <div className="mt-6 flex flex-col gap-2 border-b border-sand-300 pb-7">
          <span className="inline-flex w-fit items-center gap-1.5 bg-crimson-600 px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-wider text-white">
            {d.status}
          </span>
          <h1 className="h-display mt-1 text-[2.2rem] leading-tight text-ink sm:text-[2.9rem]">
            {d.name}
          </h1>
          <p className="flex items-center gap-1.5 text-muted">
            <MapPin className="h-4 w-4 text-crimson-600" /> {d.location}, Zanzibar
          </p>
        </div>
      </div>

      <div className="container-x mt-8">
        <PropertyGallery images={d.gallery} title={d.name} />
      </div>

      <div className="container-x mt-12 grid gap-12 pb-20 lg:grid-cols-[1fr_380px] lg:gap-16">
        <div>
          {/* Facts */}
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-sand-300 bg-sand-300 sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="bg-white p-5">
                <f.icon className="h-5 w-5 text-crimson-600" strokeWidth={1.5} />
                <p className="mt-3 text-[0.72rem] uppercase tracking-wide text-muted">{f.label}</p>
                <p className="mt-0.5 font-medium text-navy-800">{f.value}</p>
              </div>
            ))}
          </div>

          {/* Completion */}
          <div className="mt-6 border border-sand-300 bg-sand-50 p-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-navy-800">Construction progress</span>
              <span className="font-semibold text-crimson-600">{d.completionPercent}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden bg-white">
              <div className="h-full bg-navy-800" style={{ width: `${d.completionPercent}%` }} />
            </div>
          </div>

          {/* Overview */}
          <div className="mt-12">
            <h2 className="font-display text-2xl text-ink">Project Overview</h2>
            <div className="mt-4 h-px w-14 bg-crimson-600" />
            <p className="mt-6 text-[0.98rem] leading-relaxed text-muted">{d.description}</p>
          </div>

          {/* Unit types */}
          <div className="mt-12">
            <h2 className="font-display text-2xl text-ink">Available Unit Types</h2>
            <div className="mt-4 h-px w-14 bg-crimson-600" />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {d.unitTypes.map((u) => (
                <div key={u} className="flex items-center gap-3 border border-sand-300 p-4">
                  <Layers className="h-5 w-5 text-navy-800" strokeWidth={1.5} />
                  <span className="text-[0.9rem] font-medium text-navy-800">{u}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted">
              Floor plans and unit availability are shared on request and managed
              from SILA&apos;s admin dashboard.
            </p>
          </div>

          {/* Payment plan */}
          <div className="mt-12">
            <h2 className="font-display text-2xl text-ink">Payment Plan</h2>
            <div className="mt-4 h-px w-14 bg-crimson-600" />
            <div className="mt-6 flex items-start gap-3 border border-navy-800/15 bg-navy-800/[0.03] p-6">
              <Wallet className="mt-0.5 h-6 w-6 shrink-0 text-crimson-600" />
              <p className="text-[0.92rem] leading-relaxed text-navy-800">{d.paymentPlan}</p>
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-12">
            <h2 className="font-display text-2xl text-ink">Amenities</h2>
            <div className="mt-4 h-px w-14 bg-crimson-600" />
            <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {d.amenities.map((a) => (
                <li key={a} className="flex items-center gap-2.5 text-[0.9rem] text-navy-800">
                  <Check className="h-4 w-4 shrink-0 text-crimson-600" /> {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Developer / updates */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="border border-sand-300 p-6">
              <Building2 className="h-6 w-6 text-navy-800" strokeWidth={1.5} />
              <h3 className="mt-3 font-display text-lg text-navy-800">Developer Information</h3>
              <p className="mt-2 text-sm text-muted">
                Developer details and approved legal documents are provided to
                qualified buyers on request.
              </p>
            </div>
            <div className="border border-sand-300 p-6">
              <HardHat className="h-6 w-6 text-navy-800" strokeWidth={1.5} />
              <h3 className="mt-3 font-display text-lg text-navy-800">Construction Updates</h3>
              <p className="mt-2 text-sm text-muted">
                Reserved buyers receive regular progress updates and milestone
                notifications throughout construction.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside>
          <div className="sticky top-24 space-y-4">
            <div className="border border-sand-300 bg-white p-6 shadow-card">
              <h3 className="font-display text-xl text-navy-800">Enquire About This Project</h3>
              <p className="mt-1.5 text-sm text-muted">
                Request pricing, floor plans and payment plans for {d.name}.
              </p>
              <div className="mt-5">
                <EnquiryForm context={`the ${d.name} development`} source="project_enquiry" compact />
              </div>
            </div>
            <a
              href={whatsappLink(`Hello SILA, I'd like details on the ${d.name} development.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp About This Project
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
