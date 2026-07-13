"use client";

import { useState } from "react";
import { Heart, Share2, Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function ShareSave({ title }: { title: string }) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setSaved((v) => !v)}
        className="inline-flex items-center gap-2 border border-sand-300 px-3.5 py-2.5 text-[0.8rem] font-medium text-navy-800 transition-colors hover:border-navy-800"
      >
        <Heart className={cn("h-4 w-4", saved && "fill-crimson-600 text-crimson-600")} />
        {saved ? "Saved" : "Save"}
      </button>
      <button
        onClick={share}
        className="inline-flex items-center gap-2 border border-sand-300 px-3.5 py-2.5 text-[0.8rem] font-medium text-navy-800 transition-colors hover:border-navy-800"
      >
        {copied ? <Check className="h-4 w-4 text-crimson-600" /> : <Share2 className="h-4 w-4" />}
        {copied ? "Copied" : "Share"}
      </button>
    </div>
  );
}
