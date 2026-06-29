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
    <article className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-violet-300/40">
      {coverUrl && (
        <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
          <img src={coverUrl} alt="" className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105" />
        </Link>
      )}
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">
          {formatDate(post.published_at ?? post.created_at, locale)}
        </p>
        <h3 className="mt-3 text-xl font-semibold text-white">
          <Link href={`/blog/${post.slug}`} className="transition hover:text-cyan-300">
            {title}
          </Link>
        </h3>
        {excerpt && <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-300">{excerpt}</p>}
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 px-2 py-1 text-xs text-slate-300">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
