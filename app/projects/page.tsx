import { EmptyState, PageFrame, SiteFooter, SiteHeader } from "@/components/site/site-shell";
import { ProjectCard } from "@/components/site/project-card";
import { getDictionary } from "@/lib/i18n";
import { getPublishedProjects, getSiteProfile } from "@/lib/portfolio/queries";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const [t, profile, projects] = await Promise.all([
    getDictionary(),
    getSiteProfile(),
    getPublishedProjects(),
  ]);

  return (
    <main className="min-h-screen bg-slate-950">
      <SiteHeader profile={profile} />
      <PageFrame>
        <section className="mx-auto w-full max-w-6xl px-4 py-16">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{t.projects.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">{t.projects.title}</h1>
          <p className="mt-4 max-w-2xl text-slate-400">{t.projects.description}</p>
          <div className="mt-10">
            {projects.length ? (
              <div className="grid gap-5 md:grid-cols-2">
                {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
              </div>
            ) : (
              <EmptyState title={t.projects.emptyTitle} description={t.projects.emptyDescription} />
            )}
          </div>
        </section>
      </PageFrame>
      <SiteFooter profile={profile} />
    </main>
  );
}
