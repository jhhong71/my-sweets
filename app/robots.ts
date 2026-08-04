import type { MetadataRoute } from "next";

const SITE_URL = "https://my-sweets.pages.dev";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // AdSense 심사·광고 게재용 크롤러를 명시적으로 허용한다.
      // (와일드카드로도 이미 허용되지만, 명시해두면 진단이 쉽고 의도가 분명해진다.)
      { userAgent: "Mediapartners-Google", allow: "/" },
      { userAgent: "Google-Display-Ads-Bot", allow: "/" },
      { userAgent: "AdsBot-Google", allow: "/" },
      { userAgent: "AdsBot-Google-Mobile", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
