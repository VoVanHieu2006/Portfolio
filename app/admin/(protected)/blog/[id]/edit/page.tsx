import { notFound } from "next/navigation";
import { AdminCard, AdminHeader } from "@/components/admin/admin-shell";
import { BlogForm } from "@/components/admin/blog-form";
import { getDictionary } from "@/lib/i18n";
import { getPost } from "@/lib/portfolio/queries";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [t, post] = await Promise.all([getDictionary(), getPost(id)]);

  if (!post) {
    notFound();
  }

  return (
    <>
      <AdminHeader title={t.admin.editPost} description={post.title} />
      <AdminCard>
        <BlogForm post={post} />
      </AdminCard>
    </>
  );
}
