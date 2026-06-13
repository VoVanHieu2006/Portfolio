import { LanguageSwitcher } from "@/components/language-switcher";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getDictionary, getLocale } from "@/lib/i18n";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ error }, t, locale] = await Promise.all([
    searchParams,
    getDictionary(),
    getLocale(),
  ]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_35%),#020617] px-4">
      <div className="w-full max-w-sm rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Admin</p>
          <LanguageSwitcher locale={locale} compact />
        </div>
        <h1 className="mt-3 text-2xl font-semibold text-white">{t.admin.loginTitle}</h1>
        {error === "access-denied" && (
          <p className="mt-3 rounded-md border border-red-300/30 bg-red-300/10 p-3 text-sm text-red-100">
            {t.admin.accessDenied}
          </p>
        )}
        <div className="mt-6">
          <AdminLoginForm labels={{ email: t.admin.fields.email, password: t.admin.password, login: t.admin.login, loggingIn: t.admin.loggingIn }} />
        </div>
      </div>
    </main>
  );
}
