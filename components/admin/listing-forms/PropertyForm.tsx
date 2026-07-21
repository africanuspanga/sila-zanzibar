"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Field, TextInput, NumberInput, TextArea, SelectField, ToggleField, TagsField } from "@/components/admin/FormFields";
import { ImageManager } from "@/components/admin/ImageManager";
import { saveProperty, type PropertyInput } from "@/app/admin/(app)/listings/actions";
import type { PropertyRow } from "@/lib/admin/listings";
import { SaveBar, Section } from "./shell";

const CURRENCIES = [
  { value: "USD", label: "USD ($)" },
  { value: "TZS", label: "TZS" },
];
const LISTING = [
  { value: "sale", label: "For sale" },
  { value: "rent", label: "For rent" },
];
const FURNISHED = [
  { value: "Optional", label: "Optional" },
  { value: "Furnished", label: "Furnished" },
  { value: "Unfurnished", label: "Unfurnished" },
];
const RENT = [
  { value: "", label: "—" },
  { value: "month", label: "per month" },
  { value: "night", label: "per night" },
];

export function PropertyForm({ initial }: { initial: PropertyRow | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [f, setF] = useState({
    slug: initial?.slug ?? "",
    title: initial?.title ?? "",
    location: initial?.location ?? "",
    reference: initial?.reference ?? "",
    listing_type: initial?.listing_type ?? "sale",
    property_type: initial?.property_type ?? "",
    price: initial?.price?.toString() ?? "",
    currency: initial?.currency ?? "USD",
    rent_period: initial?.rent_period ?? "",
    bedrooms: initial?.bedrooms?.toString() ?? "",
    bathrooms: initial?.bathrooms?.toString() ?? "",
    size: initial?.size?.toString() ?? "",
    land_size: initial?.land_size?.toString() ?? "",
    furnished: initial?.furnished ?? "Optional",
    verified: initial?.verified ?? false,
    featured: initial?.featured ?? false,
    beachfront: initial?.beachfront ?? false,
    new_development: initial?.new_development ?? false,
    short_description: initial?.short_description ?? "",
    description: initial?.description ?? "",
    amenities: initial?.amenities ?? [],
    lat: initial?.lat?.toString() ?? "",
    lng: initial?.lng?.toString() ?? "",
    published: initial?.published ?? true,
    sort_order: initial?.sort_order?.toString() ?? "0",
  });
  const [images, setImages] = useState<string[]>(
    initial ? (Array.from(new Set([initial.image, ...(initial.gallery ?? [])].filter(Boolean))) as string[]) : []
  );

  const set = <K extends keyof typeof f>(k: K) => (v: (typeof f)[K]) => setF((s) => ({ ...s, [k]: v }));

  async function submit() {
    setSaving(true);
    setError(null);
    const input: PropertyInput = { ...f, id: initial?.id, image: images[0] ?? "", gallery: images };
    const res = await saveProperty(input);
    setSaving(false);
    if (res.error) {
      setError(res.error);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    router.push("/admin/listings");
    router.refresh();
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="space-y-5 pb-24"
    >
      {error ? (
        <div className="rounded-xl border border-crimson-200 bg-crimson-50 px-4 py-3 text-sm text-crimson-800">{error}</div>
      ) : null}

      <Section title="Basics">
        <Field label="Title" required className="sm:col-span-2">
          <TextInput value={f.title} onChange={set("title")} placeholder="Contemporary Villa in Paje" />
        </Field>
        <Field label="Slug (URL)" hint="Auto-generated from title if left blank">
          <TextInput value={f.slug} onChange={set("slug")} placeholder="contemporary-villa-paje" />
        </Field>
        <Field label="Location" required>
          <TextInput value={f.location} onChange={set("location")} placeholder="Paje" />
        </Field>
        <Field label="Property type" required>
          <TextInput value={f.property_type} onChange={set("property_type")} placeholder="Villa, Apartment…" />
        </Field>
        <Field label="Reference">
          <TextInput value={f.reference} onChange={set("reference")} placeholder="SILA-P-001" />
        </Field>
      </Section>

      <Section title="Pricing & details">
        <Field label="Listing type" required>
          <SelectField value={f.listing_type} onChange={set("listing_type")} options={LISTING} />
        </Field>
        <Field label="Price" required>
          <NumberInput value={f.price} onChange={set("price")} placeholder="385000" />
        </Field>
        <Field label="Currency">
          <SelectField value={f.currency} onChange={set("currency")} options={CURRENCIES} />
        </Field>
        <Field label="Rent period" hint="Only for rentals">
          <SelectField value={f.rent_period} onChange={set("rent_period")} options={RENT} />
        </Field>
        <Field label="Bedrooms">
          <NumberInput value={f.bedrooms} onChange={set("bedrooms")} placeholder="3" />
        </Field>
        <Field label="Bathrooms">
          <NumberInput value={f.bathrooms} onChange={set("bathrooms")} placeholder="2" />
        </Field>
        <Field label="Built size (sqm)">
          <NumberInput value={f.size} onChange={set("size")} placeholder="240" />
        </Field>
        <Field label="Land size (sqm)">
          <NumberInput value={f.land_size} onChange={set("land_size")} placeholder="600" />
        </Field>
        <Field label="Furnished">
          <SelectField value={f.furnished} onChange={set("furnished")} options={FURNISHED} />
        </Field>
      </Section>

      <Section title="Photos" full>
        <ImageManager images={images} onChange={setImages} kind="property" label="Property photos (first is the cover)" />
      </Section>

      <Section title="Highlights & description" full>
        <Field label="Amenities" hint="Comma-separated" className="mb-4">
          <TagsField value={f.amenities} onChange={set("amenities")} />
        </Field>
        <Field label="Short description" hint="One line shown on cards" className="mb-4">
          <TextInput value={f.short_description} onChange={set("short_description")} placeholder="Sea-view villa moments from the beach" />
        </Field>
        <Field label="Full description">
          <TextArea value={f.description} onChange={set("description")} rows={6} />
        </Field>
      </Section>

      <Section title="Flags & visibility">
        <ToggleField label="Published (visible on site)" checked={f.published} onChange={set("published")} />
        <ToggleField label="Featured on homepage" checked={f.featured} onChange={set("featured")} />
        <ToggleField label="Verified" checked={f.verified} onChange={set("verified")} />
        <ToggleField label="Beachfront" checked={f.beachfront} onChange={set("beachfront")} />
        <ToggleField label="New development" checked={f.new_development} onChange={set("new_development")} />
        <Field label="Sort order" hint="Lower shows first">
          <NumberInput value={f.sort_order} onChange={set("sort_order")} />
        </Field>
      </Section>

      <Section title="Map coordinates (optional)">
        <Field label="Latitude">
          <NumberInput value={f.lat} onChange={set("lat")} step="any" placeholder="-6.27" />
        </Field>
        <Field label="Longitude">
          <NumberInput value={f.lng} onChange={set("lng")} step="any" placeholder="39.53" />
        </Field>
      </Section>

      <SaveBar saving={saving} editing={!!initial} />
    </form>
  );
}
