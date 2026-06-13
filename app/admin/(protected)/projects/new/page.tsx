import { AdminCard, AdminHeader } from "@/components/admin/admin-shell";
import { ProjectForm } from "@/components/admin/project-form";
import { getDictionary } from "@/lib/i18n";

export default async function NewProjectPage() {
  const t = await getDictionary();

  return (
    <>
      <AdminHeader title={t.admin.newProject} />
      <AdminCard>
        <ProjectForm />
      </AdminCard>
    </>
  );
}
