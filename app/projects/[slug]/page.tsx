import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Link2, BookOpen, Globe, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageFrame, SiteFooter, SiteHeader } from "@/components/site/site-shell";
import { getDictionary, getLocale } from "@/lib/i18n";
import { absoluteUrl, localizedList, localizedText } from "@/lib/portfolio/format";
import { getPublishedProjectBySlug, getSiteProfile } from "@/lib/portfolio/queries";
import type { ProjectLink } from "@/lib/portfolio/types";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [t, locale, profile, project] = await Promise.all([
    getDictionary(),
    getLocale(),
    getSiteProfile(),
    getPublishedProjectBySlug(slug),
  ]);

  if (!project) {
    notFound();
  }

  const githubUrl = absoluteUrl(project.github_url);
  const demoUrl = absoluteUrl(project.demo_url);
  const coverUrl = absoluteUrl(project.cover_image_url);
  const title = localizedText(project, "title", locale) ?? project.title;
  const shortDescription = localizedText(project, "short_description", locale);
  const problem = localizedText(project, "problem", locale);
  const solution = localizedText(project, "solution", locale);
  const role = localizedText(project, "my_role", locale);
  const lessons = localizedText(project, "lessons_learned", locale);
  const keyFeatures = localizedList(project, "key_features", locale);

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader profile={profile} />
      <PageFrame>
        <article className="mx-auto w-full max-w-5xl px-4 py-16">
          <Button asChild variant="ghost" className="mb-8 text-cyan-600 dark:text-cyan-200">
            <Link href="/projects"><ArrowLeft /> {t.common.backToProjects}</Link>
          </Button>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-300">{t.projects.eyebrow}</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground">{title}</h1>
              {shortDescription && (
                <p className="mt-5 whitespace-pre-line text-lg leading-8 text-muted-foreground">
                  {shortDescription}
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-2">
                {githubUrl && (
                  <Button asChild variant="outline" className="border-border text-foreground">
                    <a href={githubUrl} target="_blank" rel="noreferrer"><Github /> {t.common.source}</a>
                  </Button>
                )}
                {demoUrl && (
                  <Button asChild className="bg-violet-500 text-white hover:bg-violet-400">
                    <a href={demoUrl} target="_blank" rel="noreferrer"><ExternalLink /> {t.common.demo}</a>
                  </Button>
                )}
              </div>
              {project.links && project.links.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.links.map((link: ProjectLink, index: number) => {
                    const url = absoluteUrl(link.url);
                    const label = localizedText({ ...link, label: link.label || '' }, "label", locale) ?? link.label ?? "";
                    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                      github: Github,
                      "link2": Link2,
                      "book-open": BookOpen,
                      globe: Globe,
                      code: Code,
                      external: ExternalLink,
                    };
                    const Icon = iconMap[link.icon || "link2"] || Link2;
                    return (
                      <Button asChild key={index} variant="outline" className="border-border text-foreground">
                        <a href={url ?? undefined} target="_blank" rel="noreferrer">
                          <Icon /> {label}
                        </a>
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
            {coverUrl && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
                <img
                  src={coverUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover blur-md opacity-40 scale-110"
                />
                <img
                  src={coverUrl}
                  alt=""
                  className="relative h-full w-full object-contain object-center"
                />
              </div>
            )}
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <DetailBlock title={t.projects.problem} value={problem} />
            <DetailBlock title={t.projects.solution} value={solution} />
            <DetailBlock title={t.projects.role} value={role} />
            <DetailBlock title={t.projects.lessons} value={lessons} />
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <ListBlock title={t.projects.techStack} items={project.tech_stack ?? []} />
            <ListBlock title={t.projects.features} items={keyFeatures} />
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
    <section className="rounded-lg border border-border bg-card p-5">
      <h2 className="font-semibold text-foreground">{title}</h2>
      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">{value}</p>
    </section>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="rounded-lg border border-border bg-card p-5">
      <h2 className="font-semibold text-foreground">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full bg-muted px-3 py-1 text-sm text-foreground/80">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
