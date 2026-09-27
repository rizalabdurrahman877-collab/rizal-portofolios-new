"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

/* =========================================================
   CEK ADMIN
========================================================= */

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

/* =========================================================
   REVALIDATE SEMUA HALAMAN
========================================================= */

function revalidateSemua() {
  revalidatePath("/");
  revalidatePath("/proyek");
  revalidatePath("/admin");
  revalidatePath("/admin/proyek");
  revalidatePath("/admin/proyek/manajemen");
}

/* =========================================================
   TAMBAH PROYEK
========================================================= */

export async function tambahProyekAction(formData: FormData) {
  const supabase = await checkAdmin();

  /* =========================
     AMBIL DATA FORM
  ========================= */

  const judul = String(formData.get("judul") ?? "").trim();
  const kategori = String(formData.get("kategori") ?? "").trim();
  const deskripsi = String(formData.get("deskripsi") ?? "").trim();
  const teknologi = String(formData.get("teknologi") ?? "").trim();
  const link = String(formData.get("link") ?? "").trim();

  const featured = formData.get("featured") === "on";

  const gambar = formData.get("gambar");

  /* =========================
     VALIDASI DATA
  ========================= */

  if (!judul || !kategori || !deskripsi || !teknologi) {
    redirect(
      `/admin/proyek/manajemen?error=${encodeURIComponent(
        "Judul, kategori, deskripsi, dan teknologi wajib diisi.",
      )}`,
    );
  }

  /* =========================
     VALIDASI GAMBAR
  ========================= */

  if (!(gambar instanceof File) || gambar.size === 0) {
    redirect(
      `/admin/proyek/manajemen?error=${encodeURIComponent(
        "Gambar proyek wajib diupload.",
      )}`,
    );
  }

  /* =========================
     VALIDASI TIPE FILE
  ========================= */

  const tipeYangDiizinkan = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!tipeYangDiizinkan.includes(gambar.type)) {
    redirect(
      `/admin/proyek/manajemen?error=${encodeURIComponent(
        "Format gambar harus JPG, PNG, atau WEBP.",
      )}`,
    );
  }

  /* =========================
     VALIDASI UKURAN
     Maksimal 5 MB
  ========================= */

  const maksimalUkuran = 5 * 1024 * 1024;

  if (gambar.size > maksimalUkuran) {
    redirect(
      `/admin/proyek/manajemen?error=${encodeURIComponent(
        "Ukuran gambar maksimal 5 MB.",
      )}`,
    );
  }

  /* =========================
     BUAT NAMA FILE
  ========================= */

  const ekstensi =
    gambar.name.split(".").pop()?.toLowerCase() || "jpg";

  const namaFile = `${Date.now()}-${crypto.randomUUID()}.${ekstensi}`;

  const pathFile = `proyek/${namaFile}`;

  /* =========================
     UPLOAD KE SUPABASE STORAGE
  ========================= */

  const { error: uploadError } = await supabase.storage
    .from("proyek")
    .upload(pathFile, gambar, {
      cacheControl: "3600",
      upsert: false,
      contentType: gambar.type,
    });

  if (uploadError) {
    console.error(
      "Gagal upload gambar:",
      uploadError.message,
    );

    redirect(
      `/admin/proyek/manajemen?error=${encodeURIComponent(
        "Gagal mengupload gambar: " + uploadError.message,
      )}`,
    );
  }

  /* =========================
     AMBIL PUBLIC URL GAMBAR
  ========================= */

  const { data: publicUrlData } = supabase.storage
    .from("proyek")
    .getPublicUrl(pathFile);

  const imageUrl = publicUrlData.publicUrl;

  /* =========================
     SIMPAN DATA KE DATABASE
  ========================= */

  const { error } = await supabase
    .from("proyek")
    .insert({
      judul,
      kategori,
      deskripsi,
      teknologi,
      gambar: imageUrl,
      link,
      featured,
    });

  /* =========================
     JIKA INSERT DATABASE GAGAL
  ========================= */

  if (error) {
    console.error(
      "Gagal menambah proyek:",
      error.message,
    );

    /*
      Hapus gambar yang sudah berhasil
      diupload agar tidak menjadi file
      yang tidak terpakai di Storage.
    */

    await supabase.storage
      .from("proyek")
      .remove([pathFile]);

    redirect(
      `/admin/proyek/manajemen?error=${encodeURIComponent(
        "Gagal menambahkan proyek: " + error.message,
      )}`,
    );
  }

  /* =========================
     REFRESH DATA
  ========================= */

  revalidateSemua();

  /* =========================
     REDIRECT
  ========================= */

  redirect(
    `/admin/proyek/manajemen?success=${encodeURIComponent(
      "Proyek berhasil ditambahkan!",
    )}`,
  );
}

/* =========================================================
   UPDATE PROYEK
========================================================= */

export async function updateProyekAction(formData: FormData) {
  const supabase = await checkAdmin();

  const id = String(formData.get("id") ?? "");
  const judul = String(formData.get("judul") ?? "").trim();
  const deskripsi = String(
    formData.get("deskripsi") ?? "",
  ).trim();
  const teknologi = String(
    formData.get("teknologi") ?? "",
  ).trim();

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
    console.error(
      "Gagal mengupdate proyek:",
      error.message,
    );

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

/* =========================================================
   HAPUS PROYEK
========================================================= */

export async function hapusProyekAction(formData: FormData) {
  const supabase = await checkAdmin();

  const id = String(formData.get("id") ?? "");

  if (!id) {
    redirect(
      `/admin/proyek?error=${encodeURIComponent(
        "ID proyek tidak valid.",
      )}`,
    );
  }

  /* =========================
     AMBIL GAMBAR PROYEK
  ========================= */

  const { data: proyek } = await supabase
    .from("proyek")
    .select("gambar")
    .eq("id", id)
    .single();

  /* =========================
     HAPUS DATA DATABASE
  ========================= */

  const { error } = await supabase
    .from("proyek")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(
      "Gagal menghapus proyek:",
      error.message,
    );

    redirect(
      `/admin/proyek?error=${encodeURIComponent(
        "Gagal menghapus proyek: " + error.message,
      )}`,
    );
  }

  /* =========================
     HAPUS GAMBAR DARI STORAGE
  ========================= */

  if (proyek?.gambar) {
    try {
      const url = new URL(proyek.gambar);

      const marker =
        "/storage/v1/object/public/proyek/";

      const index = url.pathname.indexOf(marker);

      if (index !== -1) {
        const filePath = decodeURIComponent(
          url.pathname.substring(
            index + marker.length,
          ),
        );

        await supabase.storage
          .from("proyek")
          .remove([filePath]);
      }
    } catch (error) {
      console.error(
        "Gagal menghapus gambar dari Storage:",
        error,
      );
    }
  }

  /* =========================
     REFRESH DATA
  ========================= */

  revalidateSemua();

  redirect(
    `/admin/proyek?success=${encodeURIComponent(
      "Proyek berhasil dihapus!",
    )}`,
  );
}

/* =========================================================
   LOGOUT
========================================================= */

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();

  await supabase.auth.signOut();

  redirect("/admin/login");
}