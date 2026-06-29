import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n";
import { saveProfile } from "@/lib/portfolio/actions";
import type { SiteProfile } from "@/lib/portfolio/types";

export async function ProfileForm({ profile }: { profile: SiteProfile | null }) {
  const t = await getDictionary();

  return (
    <form action={saveProfile} className="space-y-6">
      {profile?.id && <input type="hidden" name="id" value={profile.id} />}

      <div className="grid gap-4 md:grid-cols-2">
        <TextField name="full_name_vi" label={`${t.admin.fields.fullName} (VI)`} defaultValue={profile?.full_name_vi} />
        <TextField name="full_name_en" label={`${t.admin.fields.fullName} (EN)`} defaultValue={profile?.full_name_en} />
        <TextField name="headline_vi" label={`${t.admin.fields.headline} (VI)`} defaultValue={profile?.headline_vi} />
        <TextField name="headline_en" label={`${t.admin.fields.headline} (EN)`} defaultValue={profile?.headline_en} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextArea name="bio_vi" label={`${t.admin.fields.bio} (VI)`} defaultValue={profile?.bio_vi} />
        <TextArea name="bio_en" label={`${t.admin.fields.bio} (EN)`} defaultValue={profile?.bio_en} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextField name="avatar_url" label={t.admin.fields.avatarUrl} defaultValue={profile?.avatar_url} />
        <TextField name="email" label={t.admin.fields.email} defaultValue={profile?.email} />
        <TextField name="github_url" label={t.admin.fields.githubUrl} defaultValue={profile?.github_url} />
        <TextField name="linkedin_url" label={t.admin.fields.linkedinUrl} defaultValue={profile?.linkedin_url} />
        <TextField name="resume_url" label={t.admin.fields.resumeUrl} defaultValue={profile?.resume_url} />
      </div>

      <Button className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">{t.admin.saveProfile}</Button>
    </form>
  );
}

function TextField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
}) {
  return (
    <label className="block">
      <span className="text-sm text-slate-300">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue ?? ""}
        autoComplete="off"
        className="mt-1 w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
      />
    </label>
  );
}

function TextArea({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
}) {
  return (
    <label className="block">
      <span className="text-sm text-slate-300">{label}</span>
      <textarea
        name={name}
        rows={8}
        defaultValue={defaultValue ?? ""}
        autoComplete="off"
        className="mt-1 w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
      />
    </label>
  );
}
