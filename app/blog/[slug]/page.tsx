import { notFound } from "next/navigation";
import { Markdown } from "@/components/site/markdown";
import { PageFrame, SiteFooter, SiteHeader } from "@/components/site/site-shell";
import { getDictionary, getLocale } from "@/lib/i18n";
import { absoluteUrl, formatDate, localizedList, localizedText } from "@/lib/portfolio/format";
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
  const title = localizedText(post, "title", locale) ?? post.title;
  const excerpt = localizedText(post, "excerpt", locale);
  const content = localizedText(post, "content", locale);
  const tags = localizedList(post, "tags", locale);

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader profile={profile} />
      <PageFrame>
        <article className="mx-auto w-full max-w-3xl px-4 py-16">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-300">
            {formatDate(post.published_at ?? post.created_at, locale)}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground">{title}</h1>
          {tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          )}
          {excerpt && <p className="mt-5 whitespace-pre-line text-lg leading-8 text-muted-foreground">{excerpt}</p>}
          {coverUrl && (
            <div className="relative my-10 aspect-video w-full overflow-hidden rounded-lg bg-muted">
              <img
                src={coverUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover blur-md opacity-40 scale-110"
              />
              <img
                src={coverUrl}
                alt=""
                className="relative h-full w-full object-contain object-center"
              />
            </div>
          )}
          {content ? <Markdown content={content} /> : <p className="text-muted-foreground">{t.blog.noContent}</p>}
        </article>
      </PageFrame>
      <SiteFooter profile={profile} />
    </main>
  );
}
