import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminCard, AdminHeader } from "@/components/admin/admin-shell";
import {
  deleteProject,
  toggleProjectFeatured,
  toggleProjectPublished,
} from "@/lib/portfolio/actions";
import { getDictionary } from "@/lib/i18n";
import { getAllProjects } from "@/lib/portfolio/queries";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const [t, projects] = await Promise.all([getDictionary(), getAllProjects()]);

  return (
    <>
      <AdminHeader
        title={t.admin.projects}
        description={t.admin.projectsDescription}
        action={<Button asChild className="bg-cyan-400 text-slate-950 hover:bg-cyan-300"><Link href="/admin/projects/new">{t.admin.newProject}</Link></Button>}
      />
      <div className="space-y-3">
        {projects.map((project) => (
          <AdminCard key={project.id}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-semibold text-white">{project.title}</h2>
                <div className="mt-1 flex flex-wrap gap-3 text-sm text-slate-400">
                  <span>{project.slug}</span>
                  {project.published && (
                    <Link className="text-cyan-300 hover:underline" href={`/projects/${project.slug}`} target="_blank">
                      /projects/{project.slug}
                    </Link>
                  )}
                </div>
                <div className="mt-2 flex gap-2 text-xs">
                  <span className={project.published ? "text-cyan-300" : "text-slate-500"}>
                    {project.published ? "published" : "unpublished"}
                  </span>
                  <span className={project.featured ? "text-violet-300" : "text-slate-500"}>
                    {project.featured ? "featured" : "not featured"}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm" className="border-white/10 bg-transparent text-white">
                  <Link href={`/admin/projects/${project.id}/edit`}>{t.admin.edit}</Link>
                </Button>
                <form action={toggleProjectPublished}>
                  <input type="hidden" name="id" value={project.id} />
                  <input type="hidden" name="published" value={String(project.published)} />
                  <Button variant="outline" size="sm" className="border-white/10 bg-transparent text-white">
                    {project.published ? t.admin.unpublish : t.admin.publish}
                  </Button>
                </form>
                <form action={toggleProjectFeatured}>
                  <input type="hidden" name="id" value={project.id} />
                  <input type="hidden" name="featured" value={String(project.featured)} />
                  <Button variant="outline" size="sm" className="border-white/10 bg-transparent text-white">
                    {project.featured ? t.admin.unfeature : t.admin.feature}
                  </Button>
                </form>
                <form action={deleteProject}>
                  <input type="hidden" name="id" value={project.id} />
                  <Button variant="destructive" size="sm">{t.admin.delete}</Button>
                </form>
              </div>
            </div>
          </AdminCard>
        ))}
        {!projects.length && <AdminCard><p className="text-sm text-slate-400">{t.admin.noProjects}</p></AdminCard>}
      </div>
    </>
  );
}
