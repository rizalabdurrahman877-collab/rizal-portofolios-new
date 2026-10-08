import { supabase } from "@/lib/supabase";
import ProjectsClient, { type CardProject } from "./ProjectsClient";

type ProyekRow = {
  id: number;
  judul: string | null;
  kategori: string | null;
  deskripsi: string | null;
  teknologi: string | null;
  gambar: string | null;
  link: string | null;
  featured: boolean | null;
};

const PLACEHOLDER = "/placeholder-project.jpg";

// next/image mewajibkan path lokal diawali "/" atau URL absolut
function normalizeImage(src: string | null): string {
  const value = src?.trim();
  if (!value) return PLACEHOLDER;
  if (value.startsWith("/") || /^https?:\/\//i.test(value)) return value;
  return `/${value}`;
}

async function getProjects(): Promise<{
  projects: CardProject[];
  error: string;
}> {
  try {
    const { data, error } = await supabase
      .from("proyek")
      .select("id, judul, kategori, deskripsi, teknologi, gambar, link, featured")
      .order("id", { ascending: true });

    if (error) {
      console.error("SUPABASE ERROR:", error);
      return {
        projects: [],
        error: error.message || "Gagal mengambil data project.",
      };
    }

    const rows = (data ?? []) as ProyekRow[];

    const projects: CardProject[] = rows.map((row, index) => ({
      id: row.id,
      number: String(index + 1).padStart(2, "0"),
      title: row.judul?.trim() || "Project Tanpa Judul",
      category: row.kategori?.trim() || "Project",
      image: normalizeImage(row.gambar),
      description:
        row.deskripsi?.trim() || "Belum ada deskripsi untuk project ini.",
      tags: row.teknologi
        ? row.teknologi
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
      featured: row.featured ?? false,
      liveUrl: row.link?.trim() || "#",
      githubUrl: "#",
    }));

    return { projects, error: "" };
  } catch (err) {
    console.error("FETCH PROJECT ERROR:", err);
    return {
      projects: [],
      error: "Terjadi kesalahan saat mengambil data project.",
    };
  }
}

// Server Component: data diambil di server, jadi kartu proyek sudah ada di HTML
// (tanpa skeleton, tanpa menunggu JavaScript). Revalidate diatur di app/page.tsx.
export default async function Projects() {
  const { projects, error } = await getProjects();
  return <ProjectsClient projects={projects} error={error} />;
}