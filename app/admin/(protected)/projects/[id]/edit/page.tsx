import { notFound } from "next/navigation";
import { AdminCard, AdminHeader } from "@/components/admin/admin-shell";
import { ProjectForm } from "@/components/admin/project-form";
import { getDictionary } from "@/lib/i18n";
import { getProject } from "@/lib/portfolio/queries";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [t, project] = await Promise.all([getDictionary(), getProject(id)]);

  if (!project) {
    notFound();
  }

  return (
    <>
      <AdminHeader title={t.admin.editProject} description={project.title} />
      <AdminCard>
        <ProjectForm project={project} />
      </AdminCard>
    </>
  );
}
