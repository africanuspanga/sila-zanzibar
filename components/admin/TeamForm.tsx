"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TextInput, NumberInput, SelectField, ToggleField } from "@/components/admin/FormFields";
import { ImageManager } from "@/components/admin/ImageManager";
import { Section, SaveBar } from "@/components/admin/listing-forms/shell";
import { saveTeamMember, type TeamInput } from "@/app/admin/(app)/team/actions";
import type { TeamRow } from "@/lib/admin/team";

const BASES = [
  { value: "Zanzibar", label: "Zanzibar" },
  { value: "Mainland Tanzania", label: "Mainland Tanzania" },
];

export function TeamForm({ initial }: { initial: TeamRow | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [f, setF] = useState({
    name: initial?.name ?? "",
    title: initial?.title ?? "",
    base: initial?.base ?? "Zanzibar",
    published: initial?.published ?? true,
    sort_order: initial?.sort_order?.toString() ?? "0",
  });
  const [images, setImages] = useState<string[]>(initial?.image ? [initial.image] : []);

  const set = <K extends keyof typeof f>(k: K) => (v: (typeof f)[K]) => setF((s) => ({ ...s, [k]: v }));

  async function submit() {
    setSaving(true);
    setError(null);
    const input: TeamInput = { ...f, id: initial?.id, image: images[0] ?? "" };
    const res = await saveTeamMember(input);
    setSaving(false);
    if (res.error) {
      setError(res.error);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    router.push("/admin/team");
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

      <Section title="Agent details">
        <Field label="Full name" required>
          <TextInput value={f.name} onChange={set("name")} placeholder="Jane Doe" />
        </Field>
        <Field label="Title / role" required>
          <TextInput value={f.title} onChange={set("title")} placeholder="Senior Property Advisor" />
        </Field>
        <Field label="Based in">
          <SelectField value={f.base} onChange={set("base")} options={BASES} />
        </Field>
      </Section>

      <Section title="Headshot" full>
        <ImageManager images={images} onChange={setImages} kind="team" multiple={false} label="Photo (a monogram is shown until one is uploaded)" />
      </Section>

      <Section title="Visibility">
        <ToggleField label="Published (visible on site)" checked={f.published} onChange={set("published")} />
        <Field label="Sort order" hint="Lower shows first">
          <NumberInput value={f.sort_order} onChange={set("sort_order")} />
        </Field>
      </Section>

      <SaveBar saving={saving} editing={!!initial} cancelHref="/admin/team" />
    </form>
  );
}
