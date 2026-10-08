import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

// Paksa sitemap di-generate saat build, bukan saat runtime
export const dynamic = "force-static";
export const revalidate = 3600; // refresh tiap 1 jam

const baseUrl = "https://www.rizalportofolio.my.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // URL statis yang selalu ada
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/proyek`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Ambil URL proyek dari Supabase, dengan pengaman try/catch
  let projectUrls: MetadataRoute.Sitemap = [];
  try {
    // Pakai createClient biasa (anon key), BUKAN server client yang butuh cookies
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: proyek, error } = await supabase
      .from("proyek")
      .select("id")
      .order("id", { ascending: false })
      .limit(1000);

    if (error) {
      console.error("Sitemap: gagal ambil proyek dari Supabase:", error.message);
    } else if (proyek) {
      projectUrls = proyek.map((item) => ({
        url: `${baseUrl}/proyek/${item.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));
    }
  } catch (err) {
    console.error("Sitemap: exception saat ambil data:", err);
    // Tetap kembalikan staticUrls, jangan sampai sitemap 404
  }

  return [...staticUrls, ...projectUrls];
}