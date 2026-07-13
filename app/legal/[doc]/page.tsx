import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";

type Section = { heading: string; body: string[] };

const docs: Record<string, { title: string; intro: string; sections: Section[] }> = {
  privacy: {
    title: "Privacy Policy",
    intro:
      "How SILA Real Estate collects, uses and protects the information you share with us.",
    sections: [
      { heading: "Information we collect", body: ["We collect the details you provide through enquiry, listing and contact forms — such as your name, phone number, WhatsApp number, email, country and the property preferences you share with us."] },
      { heading: "How we use your information", body: ["We use your information to respond to enquiries, present suitable properties, coordinate viewings, market listings you submit, and keep you updated on relevant opportunities.", "We do not sell your personal information."] },
      { heading: "Sharing", body: ["Where necessary to progress a transaction, and with your knowledge, we may coordinate with qualified professionals such as lawyers, surveyors and valuers."] },
      { heading: "Your choices", body: ["You may request access to, correction of, or deletion of your information at any time by contacting us."] },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    intro: "The terms that govern your use of the SILA Real Estate website.",
    sections: [
      { heading: "Use of this website", body: ["Content on this website is provided for general information about property, development and investment opportunities in Zanzibar. Availability, pricing and details may change without notice."] },
      { heading: "Listings", body: ["Property information is presented in good faith. Listings are subject to review and approval, and details should be independently verified before any transaction."] },
      { heading: "No guarantees", body: ["SILA does not guarantee property values, rental income, occupancy or investment performance. Any figures shown are illustrative."] },
      { heading: "Third parties", body: ["Where SILA coordinates with independent professionals, those services are governed by the terms of the relevant provider."] },
    ],
  },
  disclaimer: {
    title: "Property & Investment Disclaimer",
    intro: "Important information about the guidance provided by SILA Real Estate.",
    sections: [
      { heading: "General guidance only", body: ["Information provided by SILA is for general property and investment guidance. Legal, tax, immigration, valuation and regulatory matters should be confirmed by appropriately qualified professionals and the relevant Zanzibar authorities before any transaction is completed."] },
      { heading: "Illustrative content", body: ["Listings, prices, imagery and statistics shown on this website may be illustrative until SILA's verified inventory and data are published. No fabricated testimonials, prices or return projections are presented as fact."] },
      { heading: "Foreign investment", body: ["Foreign investment may be possible through specific structures, approved developments, leases or investment arrangements. The applicable process depends on the property and current regulations, and independent legal advice should be obtained."] },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(docs).map((doc) => ({ doc }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ doc: string }>;
}): Promise<Metadata> {
  const { doc } = await params;
  const d = docs[doc];
  return { title: d ? d.title : "Legal" };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ doc: string }>;
}) {
  const { doc } = await params;
  const d = docs[doc];
  if (!d) notFound();

  return (
    <>
      <PageHero eyebrow="Legal" crumb={d.title} title={d.title} intro={d.intro} image="/silo-image-2.jpg" />
      <section className="bg-white py-16 lg:py-24">
        <div className="container-x max-w-3xl">
          <div className="space-y-10">
            {d.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-display text-2xl text-navy-800">{s.heading}</h2>
                <div className="mt-3 h-px w-12 bg-crimson-600" />
                {s.body.map((para, i) => (
                  <p key={i} className="mt-4 text-[0.95rem] leading-relaxed text-muted">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <p className="mt-12 border-t border-sand-300 pt-6 text-sm text-muted">
            This document is a starting point and should be reviewed and finalised with
            qualified legal counsel before publication.
          </p>
        </div>
      </section>
    </>
  );
}
