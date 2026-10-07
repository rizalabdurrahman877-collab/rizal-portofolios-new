// Satu sumber untuk URL & nama situs (dipakai layout, robots, sitemap, halaman proyek).
// Set NEXT_PUBLIC_SITE_URL di Vercel jika domain berubah.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.rizalportofolio.my.id"
).replace(/\/$/, "");

export const SITE_NAME = "Rizal Abdurrahman Wakhid";