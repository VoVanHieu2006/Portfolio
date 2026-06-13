import { AdminCard, AdminHeader } from "@/components/admin/admin-shell";
import { BlogForm } from "@/components/admin/blog-form";
import { getDictionary } from "@/lib/i18n";

export default async function NewBlogPage() {
  const t = await getDictionary();

  return (
    <>
      <AdminHeader title={t.admin.newPost} />
      <AdminCard>
        <BlogForm />
      </AdminCard>
    </>
  );
}
