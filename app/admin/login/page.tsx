import { AdminLoginForm } from "./AdminLoginForm";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;
  const redirectTo =
    redirect && redirect.startsWith("/admin") ? redirect : "/admin";

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="font-display text-3xl tracking-brand text-navy-800">
            SILA
          </p>
          <p className="mt-2 text-sm text-muted">Admin dashboard</p>
        </div>

        <div className="rounded-2xl border border-sand-300 bg-white p-8 shadow-card">
          <h1 className="mb-1 text-xl font-semibold text-navy-800">Sign in</h1>
          <p className="mb-6 text-sm text-muted">
            Restricted area for {site.legalName}.
          </p>
          <AdminLoginForm redirectTo={redirectTo} />
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          &larr; <a href="/" className="underline hover:text-navy-800">Back to website</a>
        </p>
      </div>
    </div>
  );
}
