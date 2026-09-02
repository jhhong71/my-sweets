import type { MetadataRoute } from "next";
import { POPULAR_TESTS } from "@/lib/data";

const SITE_URL = "https://my-sweets.pages.dev";

export const dynamic = "force-static";

/**
 * POPULAR_TESTS를 그대로 따라가므로 테스트를 추가할 때마다 이 파일을 따로
 * 손보지 않아도 새 페이지가 자동으로 sitemap에 들어간다(외부 사이트로 나가는
 * 항목은 검색엔진이 이 사이트 소유가 아닌 URL로 착각하지 않도록 제외).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const testEntries: MetadataRoute.Sitemap = POPULAR_TESTS.filter(
    (test) => !test.external,
  ).map((test) => ({
    url: `${SITE_URL}${test.href}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    ...testEntries,
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
