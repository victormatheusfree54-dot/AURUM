import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date("2026-08-09T00:00:00-03:00"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
