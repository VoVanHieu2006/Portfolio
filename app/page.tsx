import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/site/blog-card";
import { EmptyState, PageFrame, SiteFooter, SiteHeader } from "@/components/site/site-shell";
import { ProjectCard } from "@/components/site/project-card";
import { getDictionary, getLocale } from "@/lib/i18n";
import { absoluteUrl, localizedText } from "@/lib/portfolio/format";
import {
  getFeaturedProjects,
  getLatestPosts,
  getSiteProfile,
  getSkills,
} from "@/lib/portfolio/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [t, locale, profile, projects, posts, skills] = await Promise.all([
    getDictionary(),
    getLocale(),
    getSiteProfile(),
    getFeaturedProjects(),
    getLatestPosts(3),
    getSkills(),
  ]);
  
  // Filter skills vertically by their actual category instead of alternating them
  const hardSkills = skills.filter((skill: any) => skill.category === "hard");
  const softSkills = skills.filter((skill: any) => skill.category === "soft");

  const avatarUrl = absoluteUrl(profile?.avatar_url);
  const fullName = localizedText(profile, "full_name", locale) ?? t.home.fallbackName;
  const headline = localizedText(profile, "headline", locale) ?? t.home.fallbackHeadline;
  const bio = localizedText(profile, "bio", locale);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.16),transparent_30%),#020617]">
      <SiteHeader profile={profile} />
      <PageFrame>
        <section className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{t.home.eyebrow}</p>
            <h1 className="mt-5 text-4xl font-semibold text-white md:text-6xl">
              {fullName}
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-slate-200">
              {headline}
            </p>
            {bio && (
              <p className="mt-5 max-w-2xl whitespace-pre-line leading-7 text-slate-400">
                {bio}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                <Link href="/projects">{t.home.viewProjects} <ArrowRight /></Link>
              </Button>
              <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white">
                <Link href="/blog">{t.home.readBlog}</Link>
              </Button>
              <Button asChild variant="ghost" className="text-slate-100">
                <Link href="/cv"><Mail /> {t.home.contact}</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-violet-500/30 blur-2xl" />
            <div className="relative rounded-lg border border-white/10 bg-white/[0.06] p-4 shadow-2xl backdrop-blur">
              {avatarUrl ? (
                <img src={avatarUrl} alt={fullName} className="aspect-square w-full rounded-md object-cover" />
              ) : (
                <div className="flex aspect-square w-full items-center justify-center rounded-md bg-slate-900 text-center text-slate-400">
                  {t.home.avatarHint}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">{t.home.featuredEyebrow}</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">{t.home.featuredTitle}</h2>
            </div>
            <Button asChild variant="ghost" className="text-cyan-200">
              <Link href="/projects">{t.home.allProjects} <ArrowRight /></Link>
            </Button>
          </div>
          {projects.length ? (
            <div className="grid gap-5 md:grid-cols-2">
              {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
          ) : (
            <EmptyState title={t.home.noFeaturedTitle} description={t.home.noFeaturedDescription} />
          )}
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-violet-300">{t.home.writingEyebrow}</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">{t.home.writingTitle}</h2>
            </div>
            <Button asChild variant="ghost" className="text-cyan-200">
              <Link href="/blog">{t.home.readBlog} <ArrowRight /></Link>
            </Button>
          </div>
          {posts.length ? (
            <div className="grid gap-5 md:grid-cols-3">
              {posts.map((post) => <BlogCard key={post.id} post={post} />)}
            </div>
          ) : (
            <EmptyState title={t.home.noPostsTitle} description={t.home.noPostsDescription} />
          )}
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-16">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">{t.home.skillsEyebrow}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{t.home.skillsTitle}</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <SkillPreview title={t.home.hardSkills} skills={hardSkills} locale={locale} empty={t.home.noSkills} />
              <SkillPreview title={t.home.softSkills} skills={softSkills} locale={locale} empty={t.home.noSkills} />
            </div>
          </div>
        </section>
      </PageFrame>
      <SiteFooter profile={profile} />
    </main>
  );
}

function SkillPreview({
  title,
  skills,
  locale,
  empty,
}: {
  title: string;
  skills: { id: string; name: string; name_vi?: string | null; name_en?: string | null }[];
  locale: "vi" | "en";
  empty: string;
}) {
  return (
    <div>
      <h3 className="font-semibold text-white">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {skills.slice(0, 10).map((skill) => (
          <span key={skill.id} className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-200">
            {localizedText(skill, "name", locale) ?? skill.name}
          </span>
        ))}
        {!skills.length && <p className="text-sm text-slate-400">{empty}</p>}
      </div>
    </div>
  );
}
