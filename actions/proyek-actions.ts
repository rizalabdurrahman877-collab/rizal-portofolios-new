"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

async function checkAdmin() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return supabase;
}

function revalidateSemua() {
  revalidatePath("/");
  revalidatePath("/proyek");
  revalidatePath("/admin");
  revalidatePath("/admin/proyek");
  revalidatePath("/admin/proyek/manajemen");
}

export async function tambahProyekAction(formData: FormData) {
  const supabase = await checkAdmin();

  const judul = String(formData.get("judul") ?? "").trim();
  const deskripsi = String(formData.get("deskripsi") ?? "").trim();
  const teknologi = String(formData.get("teknologi") ?? "").trim();

  if (!judul || !deskripsi || !teknologi) {
    redirect(
      `/admin?error=${encodeURIComponent(
        "Judul, deskripsi, dan teknologi wajib diisi.",
      )}`,
    );
  }

  const { error } = await supabase.from("proyek").insert({
    judul,
    deskripsi,
    teknologi,
  });

  if (error) {
    console.error("Gagal menambah proyek:", error.message);
    redirect(
      `/admin?error=${encodeURIComponent(
        "Gagal menambahkan proyek: " + error.message,
      )}`,
    );
  }

  revalidateSemua();

  redirect(
    `/admin?success=${encodeURIComponent("Proyek berhasil ditambahkan!")}`,
  );
}

export async function updateProyekAction(formData: FormData) {
  const supabase = await checkAdmin();

  const id = String(formData.get("id") ?? "");
  const judul = String(formData.get("judul") ?? "").trim();
  const deskripsi = String(formData.get("deskripsi") ?? "").trim();
  const teknologi = String(formData.get("teknologi") ?? "").trim();

  if (!id || !judul || !deskripsi || !teknologi) {
    redirect(
      `/admin/proyek/edit/${id}?error=${encodeURIComponent(
        "Semua field wajib diisi.",
      )}`,
    );
  }

  const { error } = await supabase
    .from("proyek")
    .update({
      judul,
      deskripsi,
      teknologi,
    })
    .eq("id", id);

  if (error) {
    console.error("Gagal mengupdate proyek:", error.message);
    redirect(
      `/admin/proyek/edit/${id}?error=${encodeURIComponent(
        "Gagal menyimpan perubahan: " + error.message,
      )}`,
    );
  }

  revalidateSemua();

  redirect(
    `/admin/proyek?success=${encodeURIComponent(
      "Perubahan berhasil disimpan!",
    )}`,
  );
}

export async function hapusProyekAction(formData: FormData) {
  const supabase = await checkAdmin();

  const id = String(formData.get("id") ?? "");

  if (!id) {
    redirect(
      `/admin/proyek?error=${encodeURIComponent("ID proyek tidak valid.")}`,
    );
  }

  const { error } = await supabase.from("proyek").delete().eq("id", id);

  if (error) {
    console.error("Gagal menghapus proyek:", error.message);
    redirect(
      `/admin/proyek?error=${encodeURIComponent(
        "Gagal menghapus proyek: " + error.message,
      )}`,
    );
  }

  revalidateSemua();

  redirect(
    `/admin/proyek?success=${encodeURIComponent("Proyek berhasil dihapus!")}`,
  );
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();

  await supabase.auth.signOut();

  redirect("/admin/login");
}