import { Button } from "@/components/ui/button";
import { AdminCard, AdminHeader } from "@/components/admin/admin-shell";
import { getDictionary } from "@/lib/i18n";
import { createSkill, deleteSkill, updateSkill } from "@/lib/portfolio/actions";
import { getSkills } from "@/lib/portfolio/queries";
import type { Skill } from "@/lib/portfolio/types";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  const [t, skills] = await Promise.all([getDictionary(), getSkills()]);
  
  // Filter skills directly by category instead of using the buggy splitSkills helper
  const hardSkills = skills.filter(
    (skill) => skill.category === "hard" || skill.category === "hard_skill"
  );
  const softSkills = skills.filter(
    (skill) => skill.category === "soft" || skill.category === "soft_skill"
  );

  return (
    <>
      <AdminHeader title={t.admin.skills} description={t.admin.skillsDescription} />
      <div className="grid gap-6 xl:grid-cols-2">
        <SkillColumn
          title={t.admin.skillOptions.hard}
          category="hard_skill"
          labels={t.admin}
          skills={hardSkills}
        />
        <SkillColumn
          title={t.admin.skillOptions.soft}
          category="soft_skill"
          labels={t.admin}
          skills={softSkills}
        />
      </div>
    </>
  );
}

function SkillColumn({
  title,
  category,
  labels,
  skills,
}: {
  title: string;
  category: "hard_skill" | "soft_skill";
  labels: Awaited<ReturnType<typeof getDictionary>>["admin"];
  skills: Skill[];
}) {
  return (
    <AdminCard>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="mt-4 rounded-lg border border-white/10 bg-slate-950/60 p-4">
        <SkillForm action={createSkill} labels={labels} category={category} />
      </div>
      <div className="mt-5 space-y-3">
        {skills.map((skill) => (
          <div key={skill.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <SkillForm action={updateSkill} labels={labels} category={category} skill={skill} />
          </div>
        ))}
        {!skills.length && <p className="text-sm text-slate-400">{labels.noSkills}</p>}
      </div>
    </AdminCard>
  );
}

function SkillForm({
  action,
  labels,
  category,
  skill,
}: {
  action: (formData: FormData) => void | Promise<void>;
  labels: Awaited<ReturnType<typeof getDictionary>>["admin"];
  category: "hard_skill" | "soft_skill";
  skill?: Skill;
}) {
  return (
    <form action={action} className="grid gap-3">
      {skill && <input type="hidden" name="id" value={skill.id} />}
      <input type="hidden" name="category" value={category} />
      <div className="grid gap-3 md:grid-cols-2">
        <input
          name="name_vi"
          required
          defaultValue={skill?.name_vi ?? skill?.name ?? ""}
          placeholder={`${labels.fields.skillName} (VI)`}
          className="rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
        />
        <input
          name="name_en"
          required
          defaultValue={skill?.name_en ?? skill?.name ?? ""}
          placeholder={`${labels.fields.skillName} (EN)`}
          className="rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
        />
      </div>
      <div className="flex gap-2">
        <Button size="sm" className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">
          {skill ? labels.save : labels.add}
        </Button>
        {skill && (
          <Button formAction={deleteSkill} variant="destructive" size="sm">
            {labels.delete}
          </Button>
        )}
      </div>
    </form>
  );
}
