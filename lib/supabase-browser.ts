import { createBrowserClient } from "@supabase/ssr";

// Dipakai di Client Component ("use client") yang perlu tahu
// status login user langsung dari browser, misalnya untuk
// menampilkan/menyembunyikan tombol tertentu secara real-time.
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}