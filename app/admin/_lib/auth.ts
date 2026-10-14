import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

/**
 * Dipakai di setiap halaman admin yang dilindungi.
 * Jika belum login, arahkan ke halaman login.
 */
export async function requireAdminUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return { supabase, user };
}
