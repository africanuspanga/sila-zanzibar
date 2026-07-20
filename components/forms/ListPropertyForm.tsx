"use client";

import { useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Check, Upload, Send, Loader2 } from "lucide-react";
import { zanzibarLocations, whatsappLink } from "@/lib/site";
import { submitPropertyListing } from "@/app/actions/leads";
import { getSupabaseBrowserClient, PROPERTY_SUBMISSIONS_BUCKET } from "@/lib/supabase/client";

const propertyTypes = ["House", "Apartment", "Villa", "Office Space", "Commercial Building", "Land / Plot"];

// Pull non-empty File objects for a given input name out of the form data.
function fileList(fd: FormData, key: string): File[] {
  return fd.getAll(key).filter((f): f is File => f instanceof File && f.size > 0);
}

// Upload files to the private property-submissions bucket, returning their paths.
async function uploadFiles(supa: SupabaseClient, files: File[], prefix: string): Promise<string[]> {
  const paths: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${prefix}/${i}-${safe}`;
    const { error } = await supa.storage
      .from(PROPERTY_SUBMISSIONS_BUCKET)
      .upload(path, file, { upsert: false, contentType: file.type || undefined });
    if (error) {
      console.error("[upload]", path, error.message);
      continue;
    }
    paths.push(path);
  }
  return paths;
}

export function ListPropertyForm() {
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);

  if (sent) {
    return (
      <div className="border border-sand-300 bg-sand-50 p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy-800 text-white">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-display text-2xl text-navy-800">Submission received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          Thank you for submitting your property to SILA. Our team will review the
          details and contact you. Your listing remains unpublished until it has been
          reviewed and approved by an administrator.
        </p>
        <a href={whatsappLink("Hello SILA, I've just submitted my property for listing.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-6">
          Message us on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!consent || busy) return;
        // Capture form data synchronously before any await (React reuses the event).
        const fd = new FormData(e.currentTarget);
        const get = (k: string) => String(fd.get(k) ?? "");
        const images = fileList(fd, "images");
        const videos = fileList(fd, "video");
        const documents = fileList(fd, "documents");

        setBusy(true);

        let imagePaths: string[] = [];
        let videoPath: string | undefined;
        let documentPaths: string[] = [];

        // Upload media to Supabase Storage when configured; otherwise skip.
        const supa = getSupabaseBrowserClient();
        if (supa && (images.length || videos.length || documents.length)) {
          const folder = crypto.randomUUID();
          imagePaths = await uploadFiles(supa, images, `${folder}/images`);
          const vids = await uploadFiles(supa, videos, `${folder}/video`);
          videoPath = vids[0];
          documentPaths = await uploadFiles(supa, documents, `${folder}/documents`);
        }

        await submitPropertyListing({
          ownerName: get("ownerName"),
          ownerPhone: get("ownerPhone"),
          ownerWhatsapp: get("ownerWhatsapp"),
          ownerEmail: get("ownerEmail"),
          propertyTitle: get("propertyTitle"),
          propertyType: get("propertyType"),
          listingType: get("listingType"),
          location: get("location"),
          price: get("price"),
          currency: get("currency"),
          bedrooms: get("bedrooms"),
          bathrooms: get("bathrooms"),
          size: get("size"),
          landSize: get("landSize"),
          furnished: get("furnished"),
          mapsLink: get("mapsLink"),
          description: get("description"),
          preferredContact: get("preferredContact"),
          imagePaths,
          videoPath,
          documentPaths,
        });

        setBusy(false);
        setSent(true);
      }}
      className="space-y-8"
    >
      {/* Owner details */}
      <fieldset className="space-y-4">
        <legend className="mb-3 flex items-center gap-2 font-display text-lg text-navy-800">
          <span className="h-4 w-1 bg-crimson-600" /> Owner details
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="ownerName" label="Full name *" required placeholder="Owner's full name" />
          <Field name="ownerPhone" label="Phone number *" required placeholder="+255 …" />
          <Field name="ownerWhatsapp" label="WhatsApp number" placeholder="+255 …" />
          <Field name="ownerEmail" label="Email address" type="email" placeholder="you@email.com" />
        </div>
      </fieldset>

      {/* Property details */}
      <fieldset className="space-y-4">
        <legend className="mb-3 flex items-center gap-2 font-display text-lg text-navy-800">
          <span className="h-4 w-1 bg-crimson-600" /> Property details
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="propertyTitle" label="Property title *" required placeholder="e.g. Three-bedroom villa in Paje" className="sm:col-span-2" />
          <SelectField name="propertyType" label="Property type *" options={propertyTypes} />
          <SelectField name="listingType" label="Sale or rent *" options={["For Sale", "For Rent"]} />
          <SelectField name="location" label="Location *" options={zanzibarLocations} />
          <div className="grid grid-cols-2 gap-4">
            <Field name="price" label="Price *" required placeholder="Amount" />
            <SelectField name="currency" label="Currency" options={["USD", "TZS"]} />
          </div>
          <Field name="bedrooms" label="Bedrooms" placeholder="e.g. 3" />
          <Field name="bathrooms" label="Bathrooms" placeholder="e.g. 2" />
          <Field name="size" label="Property size (m²)" placeholder="Built area" />
          <Field name="landSize" label="Land size (m²)" placeholder="Plot area" />
          <SelectField name="furnished" label="Furnished status" options={["Furnished", "Unfurnished", "Optional"]} />
          <Field name="mapsLink" label="Google Maps location" placeholder="Paste a maps link" className="sm:col-span-2" />
          <label className="block sm:col-span-2">
            <span className="field-label">Property description</span>
            <textarea name="description" rows={4} className="field resize-none" placeholder="Describe the property, its layout, condition and surroundings…" />
          </label>
        </div>
      </fieldset>

      {/* Media */}
      <fieldset className="space-y-4">
        <legend className="mb-3 flex items-center gap-2 font-display text-lg text-navy-800">
          <span className="h-4 w-1 bg-crimson-600" /> Media &amp; documents
        </legend>
        <div className="grid gap-4 sm:grid-cols-3">
          <UploadBox name="images" label="Property images" hint="JPG / PNG" accept="image/*" />
          <UploadBox name="video" label="Property video" hint="MP4 (optional)" accept="video/*" multiple={false} />
          <UploadBox name="documents" label="Supporting documents" hint="PDF (optional)" accept=".pdf,application/pdf" />
        </div>
      </fieldset>

      {/* Preferences */}
      <fieldset className="space-y-4">
        <legend className="mb-3 flex items-center gap-2 font-display text-lg text-navy-800">
          <span className="h-4 w-1 bg-crimson-600" /> Preferences &amp; consent
        </legend>
        <SelectField name="preferredContact" label="Preferred contact method" options={["WhatsApp", "Phone call", "Email"]} />
        <label className="flex cursor-pointer items-start gap-3 border border-sand-300 bg-sand-50 p-4">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-crimson-600"
          />
          <span className="text-[0.85rem] leading-relaxed text-navy-800">
            I confirm that I am the property owner or have authority to submit this
            property for review and marketing by SILA Real Estate.
          </span>
        </label>
      </fieldset>

      <button type="submit" disabled={!consent || busy} className="btn-red w-full disabled:opacity-40 sm:w-auto">
        {busy ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Uploading &amp; submitting…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Submit Your Property
          </>
        )}
      </button>
      <p className="text-xs text-muted">
        Every submitted listing remains unpublished until reviewed and approved by an
        administrator.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="field-label">{label}</span>
      <input name={name} type={type} required={required} placeholder={placeholder} className="field" />
    </label>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <select name={name} className="field" defaultValue="">
        <option value="" disabled>Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function UploadBox({
  label,
  hint,
  name,
  accept,
  multiple = true,
}: {
  label: string;
  hint: string;
  name: string;
  accept?: string;
  multiple?: boolean;
}) {
  const [files, setFiles] = useState<string[]>([]);
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-sand-400 bg-sand-50 p-6 text-center transition-colors hover:border-navy-800">
      <Upload className="h-6 w-6 text-navy-800" strokeWidth={1.5} />
      <span className="text-[0.82rem] font-medium text-navy-800">{label}</span>
      <span className="text-xs text-muted">{hint}</span>
      {files.length > 0 && (
        <span className="mt-1 line-clamp-2 text-[0.7rem] font-medium text-navy-800">
          {files.join(", ")}
        </span>
      )}
      <input
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => setFiles(Array.from(e.target.files ?? []).map((f) => f.name))}
      />
    </label>
  );
}
