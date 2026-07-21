"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TextInput, NumberInput, TextArea, SelectField, ToggleField } from "@/components/admin/FormFields";
import { ImageManager } from "@/components/admin/ImageManager";
import { savePlot, type PlotInput } from "@/app/admin/(app)/listings/actions";
import type { PlotRow } from "@/lib/admin/listings";
import { SaveBar, Section } from "./shell";

const CURRENCIES = [
  { value: "USD", label: "USD ($)" },
  { value: "TZS", label: "TZS" },
];

export function PlotForm({ initial }: { initial: PlotRow | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [f, setF] = useState({
    slug: initial?.slug ?? "",
    title: initial?.title ?? "",
    location: initial?.location ?? "",
    size: initial?.size?.toString() ?? "",
    price: initial?.price?.toString() ?? "",
    currency: initial?.currency ?? "USD",
    price_per_sqm: initial?.price_per_sqm?.toString() ?? "",
    use: initial?.use ?? "",
    road_access: initial?.road_access ?? false,
    electricity: initial?.electricity ?? false,
    water: initial?.water ?? false,
    doc_status: initial?.doc_status ?? "",
    distance_from_road: initial?.distance_from_road ?? "",
    distance_from_beach: initial?.distance_from_beach ?? "",
    description: initial?.description ?? "",
    lat: initial?.lat?.toString() ?? "",
    lng: initial?.lng?.toString() ?? "",
    published: initial?.published ?? true,
    sort_order: initial?.sort_order?.toString() ?? "0",
  });
  const [images, setImages] = useState<string[]>(initial?.image ? [initial.image] : []);

  const set = <K extends keyof typeof f>(k: K) => (v: (typeof f)[K]) => setF((s) => ({ ...s, [k]: v }));

  async function submit() {
    setSaving(true);
    setError(null);
    const input: PlotInput = { ...f, id: initial?.id, image: images[0] ?? "" };
    const res = await savePlot(input);
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
          <TextInput value={f.title} onChange={set("title")} placeholder="Beach Plot in Bwejuu" />
        </Field>
        <Field label="Slug (URL)" hint="Auto-generated from title if left blank">
          <TextInput value={f.slug} onChange={set("slug")} placeholder="beach-plot-bwejuu" />
        </Field>
        <Field label="Location" required>
          <TextInput value={f.location} onChange={set("location")} placeholder="Bwejuu" />
        </Field>
        <Field label="Intended use">
          <TextInput value={f.use} onChange={set("use")} placeholder="Residential, Hotel…" />
        </Field>
      </Section>

      <Section title="Pricing & size">
        <Field label="Size (sqm)" required>
          <NumberInput value={f.size} onChange={set("size")} placeholder="1200" />
        </Field>
        <Field label="Price" required>
          <NumberInput value={f.price} onChange={set("price")} placeholder="90000" />
        </Field>
        <Field label="Currency">
          <SelectField value={f.currency} onChange={set("currency")} options={CURRENCIES} />
        </Field>
        <Field label="Price per sqm">
          <NumberInput value={f.price_per_sqm} onChange={set("price_per_sqm")} placeholder="75" />
        </Field>
        <Field label="Document status">
          <TextInput value={f.doc_status} onChange={set("doc_status")} placeholder="Title deed ready" />
        </Field>
      </Section>

      <Section title="Photo" full>
        <ImageManager images={images} onChange={setImages} kind="plot" multiple={false} label="Plot photo" />
      </Section>

      <Section title="Access & utilities">
        <ToggleField label="Road access" checked={f.road_access} onChange={set("road_access")} />
        <ToggleField label="Electricity" checked={f.electricity} onChange={set("electricity")} />
        <ToggleField label="Water" checked={f.water} onChange={set("water")} />
        <Field label="Distance from road">
          <TextInput value={f.distance_from_road} onChange={set("distance_from_road")} placeholder="200 m" />
        </Field>
        <Field label="Distance from beach">
          <TextInput value={f.distance_from_beach} onChange={set("distance_from_beach")} placeholder="500 m" />
        </Field>
      </Section>

      <Section title="Description" full>
        <Field label="Description">
          <TextArea value={f.description} onChange={set("description")} rows={5} />
        </Field>
      </Section>

      <Section title="Visibility & location">
        <ToggleField label="Published (visible on site)" checked={f.published} onChange={set("published")} />
        <Field label="Sort order" hint="Lower shows first">
          <NumberInput value={f.sort_order} onChange={set("sort_order")} />
        </Field>
        <Field label="Latitude">
          <NumberInput value={f.lat} onChange={set("lat")} step="any" placeholder="-6.30" />
        </Field>
        <Field label="Longitude">
          <NumberInput value={f.lng} onChange={set("lng")} step="any" placeholder="39.52" />
        </Field>
      </Section>

      <SaveBar saving={saving} editing={!!initial} />
    </form>
  );
}
