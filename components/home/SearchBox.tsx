"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { zanzibarLocations } from "@/lib/site";
import { cn } from "@/lib/cn";

const lookingFor = ["Buy", "Rent", "Build-to-Own", "Invest", "Commercial", "Land"];
const propertyTypes = [
  "House", "Apartment", "Villa", "Condominium", "Office Space",
  "Commercial Building", "Land", "Plot",
];
const bedroomOpts = ["Studio", "1", "2", "3", "4", "5+"];

const quickFilters = [
  "For Sale", "For Rent", "Beachfront", "New Development",
  "Build-to-Own", "Investment", "Land", "Commercial",
];

function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-wider text-muted">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full appearance-none border-0 border-b border-transparent bg-transparent pr-6 text-[0.92rem] font-medium text-navy-800",
            "focus:border-navy-800 focus:outline-none",
            !value && "text-muted"
          )}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-crimson-600" />
      </div>
    </label>
  );
}

export function SearchBox({ className }: { className?: string }) {
  const router = useRouter();
  const [intent, setIntent] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [beds, setBeds] = useState("");
  const [active, setActive] = useState<string | null>(null);

  function submit() {
    const params = new URLSearchParams();
    if (intent) params.set("intent", intent);
    if (type) params.set("type", type);
    if (location) params.set("location", location);
    if (beds) params.set("beds", beds);
    const dest = intent === "Land" ? "/plots" : intent === "Build-to-Own" ? "/projects" : "/properties";
    router.push(`${dest}?${params.toString()}`);
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="border border-sand-300 bg-white/95 p-5 shadow-float backdrop-blur-xl sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-4 w-1 bg-crimson-600" />
          <h3 className="font-display text-lg text-navy-800">Find the Right Property</h3>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          <Select label="Looking For" value={intent} onChange={setIntent} options={lookingFor} placeholder="Any purpose" />
          <Select label="Property Type" value={type} onChange={setType} options={propertyTypes} placeholder="Any type" />
          <Select label="Location" value={location} onChange={setLocation} options={zanzibarLocations} placeholder="Anywhere" />
          <Select label="Bedrooms" value={beds} onChange={setBeds} options={bedroomOpts} placeholder="Any" />
        </div>

        <div className="mt-5 flex flex-col gap-4 border-t border-sand-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
            {quickFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActive((v) => (v === f ? null : f))}
                className={cn(
                  "shrink-0 whitespace-nowrap border px-3 py-1.5 text-[0.72rem] font-medium transition-colors",
                  active === f
                    ? "border-crimson-600 bg-crimson-600 text-white"
                    : "border-sand-300 text-navy-800 hover:border-navy-800"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            onClick={submit}
            className="inline-flex shrink-0 items-center justify-center gap-2 bg-navy-800 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-900"
          >
            <Search className="h-4 w-4" /> Search Properties
          </button>
        </div>
      </div>
    </div>
  );
}
