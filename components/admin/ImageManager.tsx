"use client";

import { useRef, useState } from "react";
import { UploadCloud, X, Star, Loader2 } from "lucide-react";
import { getSupabaseBrowserClient, LISTING_IMAGES_BUCKET } from "@/lib/supabase/client";
import { createListingImageUploadUrl } from "@/app/admin/(app)/listings/actions";

// Uploads listing photos to the public Supabase bucket via signed upload URLs
// and manages the ordered list (first image = main / cover). Works for a single
// cover image (multiple=false) or a full gallery (multiple=true).
export function ImageManager({
  images,
  onChange,
  kind,
  multiple = true,
  label = "Photos",
}: {
  images: string[];
  onChange: (next: string[]) => void;
  kind: string;
  multiple?: boolean;
  label?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const supa = getSupabaseBrowserClient();
    if (!supa) {
      setError("Storage is not configured.");
      return;
    }
    setBusy(true);
    setError(null);
    const added: string[] = [];
    const list = multiple ? Array.from(files) : [files[0]];
    for (const file of list) {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed.");
        continue;
      }
      const signed = await createListingImageUploadUrl(kind, file.name);
      if (signed.error || !signed.path || !signed.token) {
        setError(signed.error ?? "Upload failed.");
        continue;
      }
      const up = await supa.storage
        .from(LISTING_IMAGES_BUCKET)
        .uploadToSignedUrl(signed.path, signed.token, file, { contentType: file.type || undefined });
      if (up.error) {
        setError(up.error.message);
        continue;
      }
      if (signed.publicUrl) added.push(signed.publicUrl);
    }
    onChange(multiple ? [...images, ...added] : added[0] ? [added[0]] : images);
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-navy-800">{label}</span>
        <span className="text-xs text-muted">{images.length} uploaded</span>
      </div>

      {images.length > 0 ? (
        <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((url, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <div key={url} className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-sand-300 bg-sand-100">
              <img src={url} alt="" className="h-full w-full object-cover" />
              {i === 0 && multiple ? (
                <span className="absolute left-1.5 top-1.5 rounded-full bg-navy-800 px-2 py-0.5 text-[10px] font-medium text-white">
                  Cover
                </span>
              ) : null}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-end gap-1 bg-gradient-to-t from-black/60 to-transparent p-1.5 opacity-0 transition group-hover:opacity-100">
                {multiple && i !== 0 ? (
                  <button
                    type="button"
                    title="Make cover"
                    onClick={() => onChange([url, ...images.filter((u) => u !== url)])}
                    className="rounded-md bg-white/90 p-1 text-navy-800 hover:bg-white"
                  >
                    <Star className="h-3.5 w-3.5" />
                  </button>
                ) : null}
                <button
                  type="button"
                  title="Remove"
                  onClick={() => onChange(images.filter((u) => u !== url))}
                  className="rounded-md bg-white/90 p-1 text-crimson-600 hover:bg-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <button
        type="button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-sand-400 bg-sand-50 px-4 py-4 text-sm text-navy-700 transition hover:border-navy-400 hover:bg-sand-100 disabled:opacity-60"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
        {busy ? "Uploading…" : multiple ? "Upload photos" : images.length ? "Replace photo" : "Upload photo"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {error ? <p className="mt-2 text-xs text-crimson-700">{error}</p> : null}
    </div>
  );
}
