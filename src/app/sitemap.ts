import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date("2026-08-09T00:00:00-03:00"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/privacidade"),
      lastModified: new Date("2026-08-12T00:00:00-03:00"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
