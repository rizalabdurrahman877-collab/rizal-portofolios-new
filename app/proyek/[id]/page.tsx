import { cache } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Proyek = {
  id: number | string;
  judul: string | null;
  kategori: string | null;
  deskripsi: string | null;
  teknologi: string | null;
  gambar: string | null;
  link: string | null;
  featured: boolean | null;
};

type PageProps = {
  params: Promise<{ id: string }>;
};

// Halaman dibuat statis dan disegarkan tiap 1 jam (TTFB cepat, tanpa query tiap kunjungan).
// Proyek baru yang belum ada saat build tetap dirender saat pertama kali dibuka.
export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const { data } = await supabase.from("proyek").select("id");
    return (data ?? []).map((item) => ({ id: String(item.id) }));
  } catch {
    return [];
  }
}

// cache(): generateMetadata dan halaman memakai hasil query yang sama (1 query, bukan 2)
const getProyek = cache(async (id: string): Promise<Proyek | null> => {
  const { data, error } = await supabase
    .from("proyek")
    .select("id, judul, kategori, deskripsi, teknologi, gambar, link, featured")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Detail proyek error:", error);
    return null;
  }

  return data;
});

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const proyek = await getProyek(id);

  if (!proyek) {
    return {
      title: "Proyek Tidak Ditemukan",
      description: "Proyek yang kamu cari tidak tersedia.",
      robots: { index: false, follow: false },
    };
  }

  const title = proyek.judul || "Proyek Portfolio";
  const description =
    proyek.deskripsi || `Detail proyek ${title} milik ${SITE_NAME}.`;

  // Gambar proyek jika ada, jika tidak pakai gambar OG utama situs
  const ogImage = proyek.gambar
    ? { url: proyek.gambar, width: 1200, height: 630, alt: title }
    : { url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: title };

  return {
    title,
    description,
    alternates: { canonical: `/proyek/${id}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/proyek/${id}`,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

export default async function DetailProyekPage({ params }: PageProps) {
  const { id } = await params;
  const proyek = await getProyek(id);

  if (!proyek) {
    notFound();
  }

  const teknologi = (proyek.teknologi || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-8 inline-flex rounded-full border border-white/10 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-white/10"
        >
          ← Kembali ke Portfolio
        </Link>

        <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/4 shadow-2xl">
          {proyek.gambar ? (
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={proyek.gambar}
                alt={`Gambar proyek ${proyek.judul || "portfolio"}`}
                fill
                sizes="(max-width: 768px) 100vw, 1024px"
                className="object-cover"
                priority
              />
            </div>
          ) : null}

          <div className="p-7 md:p-10">
            {proyek.kategori ? (
              <span className="inline-flex rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs font-semibold text-violet-300">
                {proyek.kategori}
              </span>
            ) : null}

            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
              {proyek.judul || "Proyek Portfolio"}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
              {proyek.deskripsi || "Belum ada deskripsi proyek."}
            </p>

            {teknologi.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {teknologi.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : null}

            {proyek.link ? (
              <a
                href={proyek.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex rounded-full bg-violet-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-400"
              >
                Lihat Proyek ↗
              </a>
            ) : null}
          </div>
        </article>
      </div>
    </main>
  );
}