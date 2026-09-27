import { createSupabaseServerClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = await createSupabaseServerClient();

    // Sign out dari Supabase
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Supabase signOut error:", error);
    }

    // Buat response redirect
    const response = NextResponse.redirect(
      new URL("/admin/login", request.url),
      { status: 302 }
    );

    // Hapus SEMUA cookies
    const allCookies = cookieStore.getAll();

    allCookies.forEach((cookie) => {
      response.cookies.delete(cookie.name);
      response.cookies.set(cookie.name, "", {
        maxAge: 0,
        path: "/",
        domain: undefined,
      });
    });

    // Hapus specific auth cookies
    const authCookieNames = [
      "sb-auth-token",
      "sb-access-token",
      "sb-refresh-token",
      "sb-session",
      "supabase-auth-token",
      "supabase-session",
      "authentication",
    ];

    authCookieNames.forEach((name) => {
      response.cookies.delete(name);
      response.cookies.set(name, "", {
        maxAge: 0,
        path: "/",
      });
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.redirect(
      new URL("/admin/login", request.url),
      { status: 302 }
    );
  }
}
