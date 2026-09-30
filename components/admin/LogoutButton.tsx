"use client";

import { useState } from "react";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    // Mencegah tombol diklik berkali-kali
    if (loading) return;

    setLoading(true);

    try {
      // Call logout API
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      // Clear browser storage
      localStorage.clear();
      sessionStorage.clear();

      // Wait for cookies to be cleared
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Redirect ke halaman login
      if (response.ok || response.redirected) {
        window.location.replace("/admin/login");
      } else {
        // Tetap redirect ke login jika API memberikan error
        window.location.replace("/admin/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);

      // Pastikan loading tetap aktif sampai redirect
      window.location.replace("/admin/login");
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-red-50 px-5 text-sm font-black text-red-600 transition hover:bg-red-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-80"
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-600/30 border-t-red-600" />
          Sedang Logout...
        </>
      ) : (
        "Logout"
      )}
    </button>
  );
}