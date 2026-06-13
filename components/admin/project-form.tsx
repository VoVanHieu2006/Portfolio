import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n";
import { createProject, updateProject } from "@/lib/portfolio/actions";
import type { Project } from "@/lib/portfolio/types";

export async function ProjectForm({ project }: { project?: Project | null }) {
  const t = await getDictionary();
  const action = project ? updateProject.bind(null, project.id) : createProject;

  return (
    <form action={action} className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="title" label={t.admin.fields.title} required defaultValue={project?.title} />
        <Field name="slug" label={t.admin.fields.slug} defaultValue={project?.slug} />
        <Field name="github_url" label={t.admin.fields.githubUrl} defaultValue={project?.github_url} />
        <Field name="demo_url" label="Demo URL" defaultValue={project?.demo_url} />
        <Field name="cover_image_url" label={t.admin.fields.coverImageUrl} defaultValue={project?.cover_image_url} />
        <Field name="order_index" label={t.admin.fields.orderIndex} type="number" defaultValue={project?.order_index?.toString()} />
      </div>
      <TextArea name="short_description" label={t.admin.fields.shortDescription} rows={3} defaultValue={project?.short_description} />
      <TextArea name="problem" label={t.admin.fields.problem} defaultValue={project?.problem} />
      <TextArea name="solution" label={t.admin.fields.solution} defaultValue={project?.solution} />
      <TextArea name="my_role" label={t.admin.fields.myRole} defaultValue={project?.my_role} />
      <TextArea name="tech_stack" label={`${t.admin.fields.techStack} (${t.admin.hints.list})`} rows={3} defaultValue={project?.tech_stack?.join("\n")} />
      <TextArea name="key_features" label={`${t.admin.fields.keyFeatures} (${t.admin.hints.list})`} rows={4} defaultValue={project?.key_features?.join("\n")} />
      <TextArea name="lessons_learned" label={t.admin.fields.lessonsLearned} defaultValue={project?.lessons_learned} />
      <div className="flex gap-5">
        <Check name="featured" label={t.admin.fields.featured} defaultChecked={project?.featured} />
        <Check name="published" label={t.admin.fields.published} defaultChecked={project?.published} />
      </div>
      <Button className="w-fit bg-cyan-400 text-slate-950 hover:bg-cyan-300">
        {project ? t.admin.updateProject : t.admin.createProject}
      </Button>
    </form>
  );
}

function Field({
  name,
  label,
  defaultValue,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm text-slate-300">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="mt-1 w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
      />
    </label>
  );
}

function TextArea({
  name,
  label,
  defaultValue,
  rows = 5,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="text-sm text-slate-300">{label}</span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        className="mt-1 w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
      />
    </label>
  );
}

function Check({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-300">
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4" />
      {label}
    </label>
  );
}
