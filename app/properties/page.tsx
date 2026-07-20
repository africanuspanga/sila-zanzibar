import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PropertiesBrowser } from "@/components/property/PropertiesBrowser";
import { getProperties } from "@/lib/content";

export const metadata: Metadata = {
  title: "Find Property in Zanzibar",
  description:
    "Browse selected homes, apartments, villas, commercial spaces, plots and investment opportunities across Zanzibar with SILA.",
  alternates: { canonical: "/properties" },
};

export const revalidate = 300;

export default async function PropertiesPage() {
  const properties = await getProperties();
  return (
    <>
      <PageHero
        eyebrow="Properties"
        title="Find Property in Zanzibar"
        intro="Browse selected homes, apartments, villas, commercial spaces, plots and investment opportunities."
        image="/silo-image.jpg"
      />
      <Suspense fallback={<div className="container-x py-20 text-muted">Loading properties…</div>}>
        <PropertiesBrowser properties={properties} />
      </Suspense>
    </>
  );
}
