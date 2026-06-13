import { Button } from "@/components/ui/button";
import { AdminCard, AdminHeader } from "@/components/admin/admin-shell";
import { getDictionary } from "@/lib/i18n";
import { createSkill, deleteSkill, updateSkill } from "@/lib/portfolio/actions";
import { getSkills } from "@/lib/portfolio/queries";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  const [t, skills] = await Promise.all([getDictionary(), getSkills()]);

  return (
    <>
      <AdminHeader title={t.admin.skills} description={t.admin.skillsDescription} />
      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <AdminCard>
          <h2 className="mb-4 font-semibold text-white">{t.admin.addSkill}</h2>
          <SkillForm action={createSkill} labels={t.admin} />
        </AdminCard>
        <div className="space-y-3">
          {skills.map((skill) => (
            <AdminCard key={skill.id}>
              <SkillForm action={updateSkill} labels={t.admin} skill={skill} />
            </AdminCard>
          ))}
          {!skills.length && <AdminCard><p className="text-sm text-slate-400">{t.admin.noSkills}</p></AdminCard>}
        </div>
      </div>
    </>
  );
}

function SkillForm({
  action,
  labels,
  skill,
}: {
  action: (formData: FormData) => void | Promise<void>;
  labels: Awaited<ReturnType<typeof getDictionary>>["admin"];
  skill?: {
    id: string;
    category: string;
    name: string;
    evidence: string | null;
    order_index: number | null;
  };
}) {
  return (
    <form action={action} className="grid gap-3 md:grid-cols-4">
      {skill && <input type="hidden" name="id" value={skill.id} />}
      <select
        name="category"
        required
        defaultValue={skill?.category ?? "hard_skill"}
        className="rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
        aria-label={labels.fields.category}
      >
        <option value="hard_skill">{labels.skillOptions.hard}</option>
        <option value="soft_skill">{labels.skillOptions.soft}</option>
      </select>
      <input name="name" required defaultValue={skill?.name ?? ""} placeholder={labels.fields.skillName} className="rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300" />
      <input name="evidence" defaultValue={skill?.evidence ?? ""} placeholder={labels.fields.evidence} className="rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300" />
      <input name="order_index" type="number" defaultValue={skill?.order_index ?? ""} placeholder={labels.fields.orderIndex} className="rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300" />
      <div className="flex gap-2 md:col-span-4">
        <Button size="sm" className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">{skill ? labels.save : labels.add}</Button>
        {skill && (
          <Button formAction={deleteSkill} name="id" value={skill.id} variant="destructive" size="sm">
            {labels.delete}
          </Button>
        )}
      </div>
    </form>
  );
}
