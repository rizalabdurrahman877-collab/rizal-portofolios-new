import type { MetadataRoute } from "next";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createSupabaseServerClient();

  const { data: proyek } = await supabase
    .from("proyek")
    .select("id")
    .order("id", { ascending: false });

  const baseUrl = "https://www.rizalportofolio.my.id";

  const projectUrls =
    proyek?.map((item) => ({
      url: `${baseUrl}/proyek/${item.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })) ?? [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectUrls,
  ];
}