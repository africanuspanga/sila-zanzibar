"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TextInput, NumberInput, TextArea, SelectField, ToggleField, TagsField } from "@/components/admin/FormFields";
import { ImageManager } from "@/components/admin/ImageManager";
import { saveProject, type ProjectInput } from "@/app/admin/(app)/listings/actions";
import type { ProjectRow } from "@/lib/admin/listings";
import { SaveBar, Section } from "./shell";

const CURRENCIES = [
  { value: "USD", label: "USD ($)" },
  { value: "TZS", label: "TZS" },
];
const STATUS = [
  { value: "Planning", label: "Planning" },
  { value: "Under Construction", label: "Under Construction" },
  { value: "Nearing Completion", label: "Nearing Completion" },
  { value: "Ready", label: "Ready" },
];

export function ProjectForm({ initial }: { initial: ProjectRow | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [f, setF] = useState({
    slug: initial?.slug ?? "",
    name: initial?.name ?? "",
    location: initial?.location ?? "",
    status: initial?.status ?? "Planning",
    completion_percent: initial?.completion_percent?.toString() ?? "0",
    est_completion: initial?.est_completion ?? "",
    starting_price: initial?.starting_price?.toString() ?? "",
    currency: initial?.currency ?? "USD",
    unit_types: initial?.unit_types ?? [],
    payment_plan: initial?.payment_plan ?? "",
    short_description: initial?.short_description ?? "",
    description: initial?.description ?? "",
    amenities: initial?.amenities ?? [],
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
    const input: ProjectInput = { ...f, id: initial?.id, image: images[0] ?? "", gallery: images };
    const res = await saveProject(input);
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
        <Field label="Project name" required className="sm:col-span-2">
          <TextInput value={f.name} onChange={set("name")} placeholder="Lagoon Residences, Fumba" />
        </Field>
        <Field label="Slug (URL)" hint="Auto-generated from name if left blank">
          <TextInput value={f.slug} onChange={set("slug")} placeholder="lagoon-residences-fumba" />
        </Field>
        <Field label="Location" required>
          <TextInput value={f.location} onChange={set("location")} placeholder="Fumba" />
        </Field>
        <Field label="Status">
          <SelectField value={f.status} onChange={set("status")} options={STATUS} />
        </Field>
        <Field label="Completion %">
          <NumberInput value={f.completion_percent} onChange={set("completion_percent")} placeholder="0" />
        </Field>
        <Field label="Est. completion">
          <TextInput value={f.est_completion} onChange={set("est_completion")} placeholder="Q4 2026" />
        </Field>
      </Section>

      <Section title="Pricing">
        <Field label="Starting price" required>
          <NumberInput value={f.starting_price} onChange={set("starting_price")} placeholder="120000" />
        </Field>
        <Field label="Currency">
          <SelectField value={f.currency} onChange={set("currency")} options={CURRENCIES} />
        </Field>
        <Field label="Payment plan">
          <TextInput value={f.payment_plan} onChange={set("payment_plan")} placeholder="30% deposit, balance on handover" />
        </Field>
      </Section>

      <Section title="Photos" full>
        <ImageManager images={images} onChange={setImages} kind="project" label="Project photos (first is the cover)" />
      </Section>

      <Section title="Details & description" full>
        <Field label="Unit types" hint="Comma-separated, e.g. Studio, 1-bed, 2-bed" className="mb-4">
          <TagsField value={f.unit_types} onChange={set("unit_types")} placeholder="Studio, 1-bed, 2-bed" />
        </Field>
        <Field label="Amenities" hint="Comma-separated" className="mb-4">
          <TagsField value={f.amenities} onChange={set("amenities")} />
        </Field>
        <Field label="Short description" className="mb-4">
          <TextInput value={f.short_description} onChange={set("short_description")} />
        </Field>
        <Field label="Full description">
          <TextArea value={f.description} onChange={set("description")} rows={6} />
        </Field>
      </Section>

      <Section title="Visibility">
        <ToggleField label="Published (visible on site)" checked={f.published} onChange={set("published")} />
        <Field label="Sort order" hint="Lower shows first">
          <NumberInput value={f.sort_order} onChange={set("sort_order")} />
        </Field>
      </Section>

      <SaveBar saving={saving} editing={!!initial} />
    </form>
  );
}
