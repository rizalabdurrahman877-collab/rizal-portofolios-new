import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // PENTING: Jangan hapus auth.getUser() ini. Ini berfungsi untuk me-refresh session token
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Tentukan rute mana saja yang termasuk publik dan admin
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isAdminRoute = pathname.startsWith('/admin');

  // 1. Jika user BELUM login dan mencoba akses /admin -> lempar ke /login
  if (!user && isAdminRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 2. Jika user SUDAH login dan mencoba akses /login atau /register -> lempar ke /admin/proyek
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/proyek'; // Ganti jika halaman dashboard utamamu berbeda
    return NextResponse.redirect(url);
  }

  // 3. Jika tidak ada kondisi yang terpenuhi, lanjutkan request seperti biasa
  return supabaseResponse;
}