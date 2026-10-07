import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import { SITE_URL } from "@/lib/site";

// Diperbarui paling lambat tiap 1 jam, jadi proyek baru otomatis masuk sitemap
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let proyekIds: Array<number | string> = [];

  try {
    const { data, error } = await supabase.from("proyek").select("id");
    if (!error && data) proyekIds = data.map((item) => item.id);
  } catch {
    // Jika Supabase gagal, sitemap tetap valid (hanya beranda)
  }

  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...proyekIds.map((id) => ({
      url: `${SITE_URL}/proyek/${id}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}