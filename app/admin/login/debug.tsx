import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function LoginDebug() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded text-xs">
      <p>User: {user ? "LOGGED IN ❌" : "LOGGED OUT ✅"}</p>
      <p>Email: {user?.email || "None"}</p>
    </div>
  );
}