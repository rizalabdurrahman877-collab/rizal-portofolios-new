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

export async function tambahProyekAction(formData: FormData) {
  const supabase = await checkAdmin();

  const judul = String(formData.get("judul") ?? "").trim();
  const deskripsi = String(formData.get("deskripsi") ?? "").trim();
  const teknologi = String(formData.get("teknologi") ?? "").trim();

  if (!judul || !deskripsi || !teknologi) {
    return;
  }

  const { error } = await supabase.from("proyek").insert({
    judul,
    deskripsi,
    teknologi,
  });

  if (error) {
    console.error("Gagal menambah proyek:", error.message);
    throw new Error("Gagal menambahkan proyek.");
  }

  revalidatePath("/");
  revalidatePath("/proyek");
  revalidatePath("/admin");
  revalidatePath("/admin/proyek");
  revalidatePath("/admin/proyek/manajemen");

  redirect("/admin");
}

export async function updateProyekAction(formData: FormData) {
  const supabase = await checkAdmin();

  const id = String(formData.get("id") ?? "");
  const judul = String(formData.get("judul") ?? "").trim();
  const deskripsi = String(formData.get("deskripsi") ?? "").trim();
  const teknologi = String(formData.get("teknologi") ?? "").trim();

  if (!id || !judul || !deskripsi || !teknologi) {
    return;
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
    throw new Error("Gagal mengupdate proyek.");
  }

  revalidatePath("/");
  revalidatePath("/proyek");
  revalidatePath("/admin");
  revalidatePath("/admin/proyek");

  redirect("/admin/proyek");
}

export async function hapusProyekAction(formData: FormData) {
  const supabase = await checkAdmin();

  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const { error } = await supabase
    .from("proyek")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Gagal menghapus proyek:", error.message);
    throw new Error("Gagal menghapus proyek.");
  }

  revalidatePath("/");
  revalidatePath("/proyek");
  revalidatePath("/admin");
  revalidatePath("/admin/proyek");

  redirect("/admin/proyek");
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();

  await supabase.auth.signOut();

  redirect("/admin/login");
}