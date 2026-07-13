"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, LayoutGrid, Rows3, X, Search } from "lucide-react";
import { PropertyCard } from "./PropertyCard";
import { properties } from "@/lib/data";
import { zanzibarLocations } from "@/lib/site";
import { cn } from "@/lib/cn";

const propertyTypes = ["House", "Apartment", "Villa", "Condominium", "Office Space", "Commercial Building"];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "latest", label: "Latest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function PropertiesBrowser() {
  const params = useSearchParams();

  const [listing, setListing] = useState(() => {
    const intent = params.get("intent");
    if (params.get("listing") === "sale" || intent === "Buy") return "sale";
    if (params.get("listing") === "rent" || intent === "Rent") return "rent";
    return "all";
  });
  const [type, setType] = useState(params.get("type") ?? "");
  const [location, setLocation] = useState(params.get("location") ?? "");
  const [beds, setBeds] = useState(params.get("beds") ?? "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [beachfront, setBeachfront] = useState(false);
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    let list = properties.filter((p) => {
      if (listing !== "all" && p.listingType !== listing) return false;
      if (type && !p.propertyType.toLowerCase().includes(type.toLowerCase())) return false;
      if (location && p.location !== location) return false;
      if (beds) {
        const n = beds === "5+" ? 5 : parseInt(beds);
        if (beds === "Studio" ? p.bedrooms !== 0 : (p.bedrooms ?? 0) < n) return false;
      }
      if (minPrice && p.price < Number(minPrice)) return false;
      if (maxPrice && p.price > Number(maxPrice)) return false;
      if (beachfront && !p.beachfront) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "featured") return Number(b.featured) - Number(a.featured);
      return 0;
    });
    return list;
  }, [listing, type, location, beds, minPrice, maxPrice, beachfront, sort]);

  const clearAll = () => {
    setListing("all");
    setType("");
    setLocation("");
    setBeds("");
    setMinPrice("");
    setMaxPrice("");
    setBeachfront(false);
  };

  const hasFilters = listing !== "all" || type || location || beds || minPrice || maxPrice || beachfront;

  return (
    <div className="container-x py-14 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Filter sidebar */}
        <aside className={cn("lg:block", showFilters ? "block" : "hidden")}>
          <div className="sticky top-24 border border-sand-300 bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl text-navy-800">Filters</h2>
              {hasFilters && (
                <button onClick={clearAll} className="inline-flex items-center gap-1 text-xs font-medium text-crimson-600">
                  <X className="h-3.5 w-3.5" /> Clear
                </button>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <span className="field-label">Looking to</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { v: "all", l: "All" },
                    { v: "sale", l: "Buy" },
                    { v: "rent", l: "Rent" },
                  ].map((o) => (
                    <button
                      key={o.v}
                      onClick={() => setListing(o.v)}
                      className={cn(
                        "border py-2 text-[0.78rem] font-medium transition-colors",
                        listing === o.v
                          ? "border-navy-800 bg-navy-800 text-white"
                          : "border-sand-300 text-navy-800 hover:border-navy-800"
                      )}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="field-label">Property Type</span>
                <select value={type} onChange={(e) => setType(e.target.value)} className="field">
                  <option value="">Any type</option>
                  {propertyTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="field-label">Location</span>
                <select value={location} onChange={(e) => setLocation(e.target.value)} className="field">
                  <option value="">Anywhere</option>
                  {zanzibarLocations.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="field-label">Bedrooms (min)</span>
                <select value={beds} onChange={(e) => setBeds(e.target.value)} className="field">
                  <option value="">Any</option>
                  {["1", "2", "3", "4", "5+"].map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </label>

              <div>
                <span className="field-label">Price range (USD)</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="field"
                  />
                  <span className="text-muted">–</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="field"
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={beachfront}
                  onChange={(e) => setBeachfront(e.target.checked)}
                  className="h-4 w-4 accent-crimson-600"
                />
                <span className="text-sm text-navy-800">Beachfront only</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">
              <span className="font-semibold text-navy-800">{results.length}</span>{" "}
              {results.length === 1 ? "property" : "properties"} found
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters((v) => !v)}
                className="inline-flex items-center gap-1.5 border border-sand-300 px-3 py-2 text-xs font-medium text-navy-800 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-sand-300 bg-white px-3 py-2 text-xs font-medium text-navy-800 focus:border-navy-800 focus:outline-none">
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>Sort: {o.label}</option>
                ))}
              </select>
              <div className="hidden border border-sand-300 sm:flex">
                <button
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  className={cn("p-2.5", view === "grid" ? "bg-navy-800 text-white" : "text-navy-800")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  aria-label="List view"
                  className={cn("p-2.5", view === "list" ? "bg-navy-800 text-white" : "text-navy-800")}
                >
                  <Rows3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {results.length > 0 ? (
            <div className={cn(view === "grid" ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3" : "grid gap-6 grid-cols-1 md:grid-cols-2")}>
              {results.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center border border-dashed border-sand-400 bg-sand-50 px-6 py-20 text-center">
              <Search className="h-10 w-10 text-sand-500" />
              <h3 className="mt-5 font-display text-2xl text-navy-800">
                No properties match your current filters
              </h3>
              <p className="mt-2 max-w-md text-sm text-muted">
                Adjust your search or contact SILA for personalised assistance — we
                often have opportunities before they reach the website.
              </p>
              <div className="mt-6 flex gap-3">
                <button onClick={clearAll} className="btn-outline">Reset filters</button>
                <Link href="/contact" className="btn-red">Request Property Assistance</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
