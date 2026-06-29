import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n";
import { createProject, updateProject } from "@/lib/portfolio/actions";
import type { Project } from "@/lib/portfolio/types";

export async function ProjectForm({ project }: { project?: Project | null }) {
  const t = await getDictionary();
  const action = project ? updateProject.bind(null, project.id) : createProject;

  return (
    <form action={action} className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="title_vi" label={`${t.admin.fields.title} (VI)`} required defaultValue={project?.title_vi ?? project?.title} />
        <Field name="title_en" label={`${t.admin.fields.title} (EN)`} required defaultValue={project?.title_en ?? project?.title} />
        <Field name="slug" label={t.admin.fields.slug} defaultValue={project?.slug} />
        <Field name="cover_image_url" label={t.admin.fields.coverImageUrl} defaultValue={project?.cover_image_url} />
        <Field name="github_url" label={t.admin.fields.githubUrl} defaultValue={project?.github_url} />
        <Field name="demo_url" label="Demo URL" defaultValue={project?.demo_url} />
        <Field name="order_index" label={t.admin.fields.orderIndex} type="number" defaultValue={project?.order_index?.toString()} />
      </div>

      <LocalizedTextAreas
        vi={<TextArea name="short_description_vi" label={`${t.admin.fields.shortDescription} (VI)`} rows={3} defaultValue={project?.short_description_vi ?? project?.short_description} />}
        en={<TextArea name="short_description_en" label={`${t.admin.fields.shortDescription} (EN)`} rows={3} defaultValue={project?.short_description_en ?? project?.short_description} />}
      />
      <LocalizedTextAreas
        vi={<TextArea name="problem_vi" label={`${t.admin.fields.problem} (VI)`} defaultValue={project?.problem_vi ?? project?.problem} />}
        en={<TextArea name="problem_en" label={`${t.admin.fields.problem} (EN)`} defaultValue={project?.problem_en ?? project?.problem} />}
      />
      <LocalizedTextAreas
        vi={<TextArea name="solution_vi" label={`${t.admin.fields.solution} (VI)`} defaultValue={project?.solution_vi ?? project?.solution} />}
        en={<TextArea name="solution_en" label={`${t.admin.fields.solution} (EN)`} defaultValue={project?.solution_en ?? project?.solution} />}
      />
      <LocalizedTextAreas
        vi={<TextArea name="my_role_vi" label={`${t.admin.fields.myRole} (VI)`} defaultValue={project?.my_role_vi ?? project?.my_role} />}
        en={<TextArea name="my_role_en" label={`${t.admin.fields.myRole} (EN)`} defaultValue={project?.my_role_en ?? project?.my_role} />}
      />
      <TextArea name="tech_stack" label={`${t.admin.fields.techStack} (${t.admin.hints.list})`} rows={3} defaultValue={project?.tech_stack?.join("\n")} />
      <LocalizedTextAreas
        vi={<TextArea name="key_features_vi" label={`${t.admin.fields.keyFeatures} (VI, ${t.admin.hints.list})`} rows={4} defaultValue={(project?.key_features_vi ?? project?.key_features)?.join("\n")} />}
        en={<TextArea name="key_features_en" label={`${t.admin.fields.keyFeatures} (EN, ${t.admin.hints.list})`} rows={4} defaultValue={(project?.key_features_en ?? project?.key_features)?.join("\n")} />}
      />
      <LocalizedTextAreas
        vi={<TextArea name="lessons_learned_vi" label={`${t.admin.fields.lessonsLearned} (VI)`} defaultValue={project?.lessons_learned_vi ?? project?.lessons_learned} />}
        en={<TextArea name="lessons_learned_en" label={`${t.admin.fields.lessonsLearned} (EN)`} defaultValue={project?.lessons_learned_en ?? project?.lessons_learned} />}
      />

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

function LocalizedTextAreas({ vi, en }: { vi: React.ReactNode; en: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{vi}{en}</div>;
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
