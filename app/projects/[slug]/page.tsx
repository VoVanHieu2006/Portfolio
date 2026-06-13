import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageFrame, SiteFooter, SiteHeader } from "@/components/site/site-shell";
import { getDictionary } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/portfolio/format";
import { getPublishedProjectBySlug, getSiteProfile } from "@/lib/portfolio/queries";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [t, profile, project] = await Promise.all([
    getDictionary(),
    getSiteProfile(),
    getPublishedProjectBySlug(slug),
  ]);

  if (!project) {
    notFound();
  }

  const githubUrl = absoluteUrl(project.github_url);
  const demoUrl = absoluteUrl(project.demo_url);
  const coverUrl = absoluteUrl(project.cover_image_url);

  return (
    <main className="min-h-screen bg-slate-950">
      <SiteHeader profile={profile} />
      <PageFrame>
        <article className="mx-auto w-full max-w-5xl px-4 py-16">
          <Button asChild variant="ghost" className="mb-8 text-cyan-200">
            <Link href="/projects"><ArrowLeft /> {t.common.backToProjects}</Link>
          </Button>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">{t.projects.eyebrow}</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-white">{project.title}</h1>
              {project.short_description && (
                <p className="mt-5 whitespace-pre-line text-lg leading-8 text-slate-300">
                  {project.short_description}
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-2">
                {githubUrl && (
                  <Button asChild variant="outline" className="border-white/10 bg-transparent text-white">
                    <a href={githubUrl} target="_blank" rel="noreferrer"><Github /> {t.common.source}</a>
                  </Button>
                )}
                {demoUrl && (
                  <Button asChild className="bg-violet-500 text-white hover:bg-violet-400">
                    <a href={demoUrl} target="_blank" rel="noreferrer"><ExternalLink /> {t.common.demo}</a>
                  </Button>
                )}
              </div>
            </div>
            {coverUrl && (
              <img src={coverUrl} alt="" className="aspect-video w-full rounded-lg border border-white/10 object-cover" />
            )}
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <DetailBlock title={t.projects.problem} value={project.problem} />
            <DetailBlock title={t.projects.solution} value={project.solution} />
            <DetailBlock title={t.projects.role} value={project.my_role} />
            <DetailBlock title={t.projects.lessons} value={project.lessons_learned} />
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <ListBlock title={t.projects.techStack} items={project.tech_stack ?? []} />
            <ListBlock title={t.projects.features} items={project.key_features ?? []} />
          </div>
        </article>
      </PageFrame>
      <SiteFooter profile={profile} />
    </main>
  );
}

function DetailBlock({ title, value }: { title: string; value: string | null }) {
  if (!value) {
    return null;
  }

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <h2 className="font-semibold text-white">{title}</h2>
      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-300">{value}</p>
    </section>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <h2 className="font-semibold text-white">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-200">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
