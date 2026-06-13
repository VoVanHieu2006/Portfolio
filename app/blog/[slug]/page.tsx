import { notFound } from "next/navigation";
import { Markdown } from "@/components/site/markdown";
import { PageFrame, SiteFooter, SiteHeader } from "@/components/site/site-shell";
import { getDictionary, getLocale } from "@/lib/i18n";
import { absoluteUrl, formatDate } from "@/lib/portfolio/format";
import { getPublishedPostBySlug, getSiteProfile } from "@/lib/portfolio/queries";

export const dynamic = "force-dynamic";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [t, locale, profile, post] = await Promise.all([
    getDictionary(),
    getLocale(),
    getSiteProfile(),
    getPublishedPostBySlug(slug),
  ]);

  if (!post) {
    notFound();
  }
  const coverUrl = absoluteUrl(post.cover_image_url);

  return (
    <main className="min-h-screen bg-slate-950">
      <SiteHeader profile={profile} />
      <PageFrame>
        <article className="mx-auto w-full max-w-3xl px-4 py-16">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
            {formatDate(post.published_at ?? post.created_at, locale)}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white">{post.title}</h1>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          )}
          {post.excerpt && <p className="mt-5 whitespace-pre-line text-lg leading-8 text-slate-300">{post.excerpt}</p>}
          {coverUrl && (
            <img src={coverUrl} alt="" className="my-10 aspect-video w-full rounded-lg object-cover" />
          )}
          {post.content ? <Markdown content={post.content} /> : <p className="text-slate-400">{t.blog.noContent}</p>}
        </article>
      </PageFrame>
      <SiteFooter profile={profile} />
    </main>
  );
}
