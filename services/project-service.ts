// services/project-service.ts

import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function getProjects() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("proyek")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Gagal mengambil proyek:", error.message);
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getProjectById(id: number) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("proyek")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Gagal mengambil proyek:", error.message);
    throw new Error(error.message);
  }

  return data;
}