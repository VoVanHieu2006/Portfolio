import { AdminCard, AdminHeader } from "@/components/admin/admin-shell";
import { ProfileForm } from "@/components/admin/profile-form";
import { getDictionary } from "@/lib/i18n";
import { getSiteProfile } from "@/lib/portfolio/queries";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const [t, profile] = await Promise.all([getDictionary(), getSiteProfile()]);

  return (
    <>
      <AdminHeader title={t.admin.profile} description={t.admin.profileDescription} />
      <AdminCard>
        <ProfileForm profile={profile} />
      </AdminCard>
    </>
  );
}
