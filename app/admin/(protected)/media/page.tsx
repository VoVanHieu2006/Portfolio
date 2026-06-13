import { AdminCard, AdminHeader } from "@/components/admin/admin-shell";
import { MediaUploader } from "@/components/admin/media-uploader";
import { getDictionary } from "@/lib/i18n";

export default async function AdminMediaPage() {
  const t = await getDictionary();

  return (
    <>
      <AdminHeader title={t.admin.media} description={t.admin.mediaDescription} />
      <AdminCard>
        <MediaUploader
          labels={{
            upload: t.admin.upload,
            uploading: t.admin.uploading,
            chooseFile: t.admin.chooseFile,
            publicUrl: t.admin.publicUrl,
          }}
        />
      </AdminCard>
    </>
  );
}
