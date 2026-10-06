import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const SITE_URL = "https://rizalportofolio.my.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  const { data: daftarProyek, error } = await supabase
    .from("proyek")
    .select("id");

  if (error) {
    console.error("Sitemap proyek error:", error);
    return staticPages;
  }

  const halamanProyek: MetadataRoute.Sitemap = (daftarProyek ?? []).map(
    (item: { id: string | number }) => ({
      url: `${SITE_URL}/proyek/${item.id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  return [...staticPages, ...halamanProyek];
}