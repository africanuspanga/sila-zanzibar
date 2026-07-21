import { redirect } from "next/navigation";
import { getSupabaseAuthClient } from "@/lib/supabase/auth-server";
import { ADMIN_EMAIL } from "@/lib/admin";
import { Sidebar } from "@/components/admin/Sidebar";

export const dynamic = "force-dynamic";

export default async function AdminAppLayout({ children }: { children: React.ReactNode }) {
  const auth = await getSupabaseAuthClient();
  if (!auth) redirect("/admin/login");
  const {
    data: { user },
  } = await auth.auth.getUser();
  if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-sand-100">
      <Sidebar email={user.email ?? ADMIN_EMAIL} />
      <div className="lg:pl-64">
        <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-8 sm:py-8">{children}</div>
      </div>
    </div>
  );
}
