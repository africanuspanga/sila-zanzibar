import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ListPropertyForm } from "@/components/forms/ListPropertyForm";

export const metadata: Metadata = {
  title: "List Your Property",
  description:
    "List your Zanzibar house, apartment, villa, office, commercial building, plot or land with SILA and reach qualified buyers and tenants.",
};

const provides = [
  "Property listing preparation",
  "Professional photography coordination",
  "Property description writing",
  "Website marketing",
  "Social media promotion",
  "Buyer and tenant enquiries",
  "Viewing coordination",
  "Offer communication",
  "Transaction support",
  "Rental marketing",
  "Property owner updates",
];

export default function ListYourPropertyPage() {
  return (
    <>
      <PageHero
        eyebrow="List Your Property"
        crumb="List Your Property"
        title="Let SILA Market Your Property"
        intro="Own a house, apartment, villa, office, commercial building, plot or land in Zanzibar? List it with SILA and allow our team to professionally present it to potential buyers, tenants and investors."
        image="/silo-image-6.jpg"
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display text-2xl text-navy-800">What SILA Can Provide</h2>
            <div className="mt-4 h-px w-14 bg-crimson-600" />
            <ul className="mt-6 space-y-3">
              {provides.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[0.9rem] text-navy-800">
                  <Check className="h-4 w-4 shrink-0 text-crimson-600" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <Reveal>
            <div className="border border-sand-300 bg-white p-6 shadow-card sm:p-8">
              <ListPropertyForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
