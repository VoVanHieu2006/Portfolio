import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { absoluteUrl, localizedText } from "@/lib/portfolio/format";
import { getDictionary, getLocale } from "@/lib/i18n";
import type { SiteProfile } from "@/lib/portfolio/types";

export async function SiteHeader({ profile }: { profile?: SiteProfile | null }) {
  const [t, locale] = await Promise.all([getDictionary(), getLocale()]);
  const displayName = localizedText(profile, "full_name", locale) ?? t.common.portfolio;
  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/projects", label: t.nav.projects },
    { href: "/blog", label: t.nav.blog },
    { href: "/cv", label: t.nav.cv },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="text-sm font-semibold text-white transition hover:text-cyan-300">
          {displayName}
        </Link>
        <nav className="order-3 flex w-full items-center gap-1 overflow-x-auto md:order-none md:w-auto">
          {navItems.map((item) => (
            <Button key={item.href} asChild variant="ghost" size="sm">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} compact />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

export async function SiteFooter({ profile }: { profile?: SiteProfile | null }) {
  const [t, locale] = await Promise.all([getDictionary(), getLocale()]);
  const displayName = localizedText(profile, "full_name", locale) ?? t.common.portfolio;
  const githubUrl = absoluteUrl(profile?.github_url);
  const linkedinUrl = absoluteUrl(profile?.linkedin_url);

  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {displayName}</p>
        <div className="flex flex-wrap gap-4">
          {githubUrl && (
            <a className="transition hover:text-cyan-300" href={githubUrl} target="_blank" rel="noreferrer">
              {t.common.github}
            </a>
          )}
          {linkedinUrl && (
            <a className="transition hover:text-cyan-300" href={linkedinUrl} target="_blank" rel="noreferrer">
              {t.common.linkedin}
            </a>
          )}
          {profile?.email && <span className="text-slate-300">{profile.email}</span>}
        </div>
      </div>
    </footer>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-dashed border-white/15 bg-white/[0.03] p-8 text-center">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  return <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">{children}</div>;
}
