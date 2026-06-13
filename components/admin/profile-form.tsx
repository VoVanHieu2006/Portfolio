import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n";
import { saveProfile } from "@/lib/portfolio/actions";
import type { SiteProfile } from "@/lib/portfolio/types";

export async function ProfileForm({ profile }: { profile: SiteProfile | null }) {
  const t = await getDictionary();
  const fields = [
    ["full_name", t.admin.fields.fullName],
    ["headline", t.admin.fields.headline],
    ["avatar_url", t.admin.fields.avatarUrl],
    ["email", t.admin.fields.email],
    ["github_url", t.admin.fields.githubUrl],
    ["linkedin_url", t.admin.fields.linkedinUrl],
    ["resume_url", t.admin.fields.resumeUrl],
  ] as const;

  return (
    <form action={saveProfile} className="space-y-4">
      {profile?.id && <input type="hidden" name="id" value={profile.id} />}
      {fields.map(([field, label]) => (
        <label key={field} className="block">
          <span className="text-sm text-slate-300">{label}</span>
          <input
            name={field}
            defaultValue={profile?.[field] ?? ""}
            className="mt-1 w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
          />
        </label>
      ))}
      <label className="block">
        <span className="text-sm text-slate-300">{t.admin.fields.bio}</span>
        <textarea
          name="bio"
          rows={7}
          defaultValue={profile?.bio ?? ""}
          className="mt-1 w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
        />
      </label>
      <Button className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">{t.admin.saveProfile}</Button>
    </form>
  );
}
