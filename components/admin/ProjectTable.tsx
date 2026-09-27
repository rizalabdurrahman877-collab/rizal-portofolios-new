// components/admin/ProjectTable.tsx

import Link from "next/link";

type Project = {
  id: number;
  judul: string | null;
  kategori?: string | null;
  teknologi?: string | null;
  link?: string | null;
};

type ProjectTableProps = {
  projects: Project[];
};

export default function ProjectTable({
  projects,
}: ProjectTableProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <p className="text-sm text-slate-500">
          Belum ada proyek yang tersedia.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-175 text-left">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                #
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Proyek
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Kategori
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Teknologi
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {projects.map((project, index) => (
              <tr
                key={project.id}
                className="transition-colors hover:bg-slate-50"
              >
                <td className="px-5 py-4 text-sm text-slate-400">
                  {String(index + 1).padStart(2, "0")}
                </td>

                <td className="px-5 py-4">
                  <div className="font-semibold text-slate-800">
                    {project.judul || "Tanpa Judul"}
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-xs text-blue-600 hover:underline"
                    >
                      Kembali ke portofolio ↗
                    </a>
                  )}
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {project.kategori || "Umum"}
                  </span>
                </td>

                <td className="max-w-55 px-5 py-4 text-sm text-slate-500">
                  {project.teknologi || "-"}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/proyek/edit/${project.id}`}
                      className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-100"
                    >
                      Edit
                    </Link>

                    <Link
                      href={`/admin/proyek/hapus/${project.id}`}
                      className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      Hapus
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}