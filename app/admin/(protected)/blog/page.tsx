import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminCard, AdminHeader } from "@/components/admin/admin-shell";
import { deletePost, togglePostPublished } from "@/lib/portfolio/actions";
import { formatDate } from "@/lib/portfolio/format";
import { getDictionary, getLocale } from "@/lib/i18n";
import { getAllPosts } from "@/lib/portfolio/queries";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const [t, locale, posts] = await Promise.all([getDictionary(), getLocale(), getAllPosts()]);

  return (
    <>
      <AdminHeader
        title={t.admin.blog}
        description={t.admin.blogDescription}
        action={<Button asChild className="bg-cyan-400 text-slate-950 hover:bg-cyan-300"><Link href="/admin/blog/new">{t.admin.newPost}</Link></Button>}
      />
      <div className="space-y-3">
        {posts.map((post) => (
          <AdminCard key={post.id}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-semibold text-white">{post.title}</h2>
                <div className="mt-1 flex flex-wrap gap-3 text-sm text-slate-400">
                  <span>{post.slug}</span>
                  <span>{formatDate(post.published_at ?? post.created_at, locale)}</span>
                  {post.status === "published" && (
                    <Link className="text-cyan-300 hover:underline" href={`/blog/${post.slug}`} target="_blank">
                      /blog/{post.slug}
                    </Link>
                  )}
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white/10 px-2 py-1 text-xs text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className={post.status === "published" ? "mt-2 text-xs text-cyan-300" : "mt-2 text-xs text-slate-500"}>{post.status}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm" className="border-white/10 bg-transparent text-white">
                  <Link href={`/admin/blog/${post.id}/edit`}>{t.admin.edit}</Link>
                </Button>
                <form action={togglePostPublished}>
                  <input type="hidden" name="id" value={post.id} />
                  <input type="hidden" name="status" value={post.status} />
                  <Button variant="outline" size="sm" className="border-white/10 bg-transparent text-white">
                    {post.status === "published" ? t.admin.unpublish : t.admin.publish}
                  </Button>
                </form>
                <form action={deletePost}>
                  <input type="hidden" name="id" value={post.id} />
                  <Button variant="destructive" size="sm">{t.admin.delete}</Button>
                </form>
              </div>
            </div>
          </AdminCard>
        ))}
        {!posts.length && <AdminCard><p className="text-sm text-slate-400">{t.admin.noPosts}</p></AdminCard>}
      </div>
    </>
  );
}
