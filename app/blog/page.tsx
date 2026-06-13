import { BlogCard } from "@/components/site/blog-card";
import { EmptyState, PageFrame, SiteFooter, SiteHeader } from "@/components/site/site-shell";
import { getDictionary } from "@/lib/i18n";
import { getPublishedPosts, getSiteProfile } from "@/lib/portfolio/queries";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const [t, profile, posts] = await Promise.all([
    getDictionary(),
    getSiteProfile(),
    getPublishedPosts(),
  ]);

  return (
    <main className="min-h-screen bg-slate-950">
      <SiteHeader profile={profile} />
      <PageFrame>
        <section className="mx-auto w-full max-w-6xl px-4 py-16">
          <p className="text-sm uppercase tracking-[0.3em] text-violet-300">{t.blog.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">{t.blog.title}</h1>
          <div className="mt-10">
            {posts.length ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => <BlogCard key={post.id} post={post} />)}
              </div>
            ) : (
              <EmptyState title={t.blog.emptyTitle} description={t.blog.emptyDescription} />
            )}
          </div>
        </section>
      </PageFrame>
      <SiteFooter profile={profile} />
    </main>
  );
}
