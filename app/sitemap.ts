import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/services", "/approach", "/about", "/references", "/contact"];
  return paths.map((path) => ({ url: `${SITE.url}${path}`, changeFrequency: "monthly", priority: path === "" ? 1 : 0.7 }));
}
