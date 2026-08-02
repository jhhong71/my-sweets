import type { MetadataRoute } from "next";

const SITE_URL = "https://my-sweets.pages.dev";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/tests/my-sweets`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
