import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getProperties, getProjects, getPlots } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url;
  const now = new Date();
  const [properties, developments, plots] = await Promise.all([
    getProperties(),
    getProjects(),
    getPlots(),
  ]);

  const staticPaths: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/properties", priority: 0.9, freq: "daily" },
    { path: "/projects", priority: 0.9, freq: "weekly" },
    { path: "/plots", priority: 0.9, freq: "weekly" },
    { path: "/investment-advisory", priority: 0.8, freq: "monthly" },
    { path: "/list-your-property", priority: 0.7, freq: "monthly" },
    { path: "/services", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/team", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.7, freq: "monthly" },
    { path: "/legal/privacy", priority: 0.3, freq: "yearly" },
    { path: "/legal/terms", priority: 0.3, freq: "yearly" },
    { path: "/legal/disclaimer", priority: 0.3, freq: "yearly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p.path}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));

  const propertyEntries: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${base}/properties/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const projectEntries: MetadataRoute.Sitemap = developments.map((d) => ({
    url: `${base}/projects/${d.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const plotEntries: MetadataRoute.Sitemap = plots.map((p) => ({
    url: `${base}/plots/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticEntries, ...propertyEntries, ...projectEntries, ...plotEntries];
}
