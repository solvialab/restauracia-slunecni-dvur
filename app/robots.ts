import type { MetadataRoute } from "next";
import { restaurantConfig } from "@/config/restaurant";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${restaurantConfig.url}/sitemap.xml`,
  };
}
