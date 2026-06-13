import Link from "next/link";
import { FolderKanban, Gauge, Image, Mail, PenLine, User, Wrench } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { LogoutButton } from "@/components/logout-button";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const [t, locale] = await Promise.all([getDictionary(), getLocale()]);
  const items = [
    { href: "/admin", label: t.admin.dashboard, icon: Gauge },
    { href: "/admin/profile", label: t.admin.profile, icon: User },
    { href: "/admin/projects", label: t.admin.projects, icon: FolderKanban },
    { href: "/admin/blog", label: t.admin.blog, icon: PenLine },
    { href: "/admin/skills", label: t.admin.skills, icon: Wrench },
    { href: "/admin/media", label: t.admin.media, icon: Image },
    { href: "/admin/messages", label: t.admin.messages, icon: Mail },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 md:grid md:grid-cols-[250px_1fr]">
      <aside className="border-b border-white/10 bg-slate-950/90 p-4 md:min-h-screen md:border-b-0 md:border-r">
        <div className="flex items-center justify-between gap-3 md:block">
          <Link href="/admin" className="block text-lg font-semibold text-white transition hover:text-cyan-300">
            {t.admin.title}
          </Link>
          <div className="md:mt-4">
            <LanguageSwitcher locale={locale} compact />
          </div>
        </div>
        <nav className="mt-6 flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-6">
          <LogoutButton label={t.admin.logout} />
        </div>
      </aside>
      <section className="animate-in fade-in slide-in-from-bottom-2 p-4 duration-500 md:p-8">
        {children}
      </section>
    </main>
  );
}

export function AdminHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-3xl font-semibold text-white">{title}</h1>
        {description && <p className="mt-2 text-sm text-slate-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function AdminCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-blue-950/20 backdrop-blur">
      {children}
    </div>
  );
}
