import Link from "next/link";
import { ArrowRight, ExternalLink, Github, Link2, BookOpen, Globe, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { absoluteUrl, localizedText } from "@/lib/portfolio/format";
import { getDictionary, getLocale } from "@/lib/i18n";
import type { Project, ProjectLink } from "@/lib/portfolio/types";

export async function ProjectCard({ project }: { project: Project }) {
  const [t, locale] = await Promise.all([getDictionary(), getLocale()]);
  const githubUrl = absoluteUrl(project.github_url);
  const demoUrl = absoluteUrl(project.demo_url);
  const coverUrl = absoluteUrl(project.cover_image_url);
  const title = localizedText(project, "title", locale) ?? project.title;
  const shortDescription = localizedText(project, "short_description", locale);

  return (
    <article className="group rounded-lg border border-border bg-card p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-cyan-500/50 dark:shadow-cyan-950/20 dark:hover:border-cyan-300/50">
      {coverUrl && (
        <Link href={`/projects/${project.slug}`} className="mb-5 block overflow-hidden rounded-md relative aspect-video w-full bg-muted">
          <img
            src={coverUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover blur-md opacity-40 scale-110"
          />
          <img
            src={coverUrl}
            alt=""
            className="relative h-full w-full object-contain object-center transition duration-500 group-hover:scale-105"
          />
        </Link>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground">
            <Link href={`/projects/${project.slug}`} className="transition hover:text-cyan-500 dark:hover:text-cyan-300">
              {title}
            </Link>
          </h3>
          {shortDescription && (
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-muted-foreground">
              {shortDescription}
            </p>
          )}
        </div>
        {project.featured && (
          <span className="inline-flex min-h-6 items-center justify-center rounded-full border border-cyan-500/40 px-3 py-1 text-center text-xs leading-none text-cyan-600 dark:border-cyan-300/40 dark:text-cyan-200">
            {t.projects.featured}
          </span>
        )}
      </div>
      {project.tech_stack && project.tech_stack.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech_stack.map((tech) => (
            <span key={tech} className="rounded-full bg-muted px-3 py-1 text-xs text-foreground/80">
              {tech}
            </span>
          ))}
        </div>
      )}
      <div className="mt-5 flex flex-wrap gap-2">
        <Button asChild size="sm" className="bg-cyan-500 text-white hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300">
          <Link href={`/projects/${project.slug}`}>
            {t.common.readMore} <ArrowRight />
          </Link>
        </Button>
        {githubUrl && (
          <Button asChild variant="outline" size="sm" className="border-border text-foreground">
            <a href={githubUrl} target="_blank" rel="noreferrer">
              <Github /> {t.common.source}
            </a>
          </Button>
        )}
        {demoUrl && (
          <Button asChild size="sm" className="bg-violet-500 text-white hover:bg-violet-400">
            <a href={demoUrl} target="_blank" rel="noreferrer">
              <ExternalLink /> {t.common.demo}
            </a>
          </Button>
        )}
        {project.links && project.links.length > 0 && (
          <>
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
                <Button asChild key={index} variant="outline" size="sm" className="border-border text-foreground">
                  <a href={url ?? undefined} target="_blank" rel="noreferrer">
                    <Icon /> {label}
                  </a>
                </Button>
              );
            })}
          </>
        )}
      </div>
    </article>
  );
}
