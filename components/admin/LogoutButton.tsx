"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
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

      // Redirect dari client side (bypass middleware)
      if (response.ok || response.redirected) {
        window.location.replace("/admin/login");
      } else {
        window.location.replace("/admin/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Force redirect anyway
      window.location.replace("/admin/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex h-11 items-center justify-center rounded-xl bg-red-50 px-5 text-sm font-black text-red-600 transition hover:bg-red-100"
    >
      Logout
    </button>
  );
}
