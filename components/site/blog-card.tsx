import Link from "next/link";
import type { BlogPost } from "@/lib/portfolio/types";
import { absoluteUrl, formatDate, localizedList, localizedText } from "@/lib/portfolio/format";
import { getLocale } from "@/lib/i18n";

export async function BlogCard({ post }: { post: BlogPost }) {
  const locale = await getLocale();
  const coverUrl = absoluteUrl(post.cover_image_url);
  const title = localizedText(post, "title", locale) ?? post.title;
  const excerpt = localizedText(post, "excerpt", locale);
  const tags = localizedList(post, "tags", locale);

  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-card backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-violet-500/40 dark:hover:border-violet-300/40">
      {coverUrl && (
        <Link href={`/blog/${post.slug}`} className="block overflow-hidden relative aspect-video w-full bg-muted">
          <img
            src={coverUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover blur-md opacity-40 scale-110"
          />
          <img
            src={coverUrl}
            alt=""
            className="relative h-full w-full object-contain object-center transition duration-500 group-hover:scale-105"
          />
        </Link>
      )}
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">
          {formatDate(post.published_at ?? post.created_at, locale)}
        </p>
        <h3 className="mt-3 text-xl font-semibold text-foreground">
          <Link href={`/blog/${post.slug}`} className="transition hover:text-cyan-500 dark:hover:text-cyan-300">
            {title}
          </Link>
        </h3>
        {excerpt && <p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted-foreground">{excerpt}</p>}
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border px-2 py-1 text-xs text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
