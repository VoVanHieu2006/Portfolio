import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n";
import { createPost, updatePost } from "@/lib/portfolio/actions";
import type { BlogPost } from "@/lib/portfolio/types";

export async function BlogForm({ post }: { post?: BlogPost | null }) {
  const t = await getDictionary();
  const action = post ? updatePost.bind(null, post.id) : createPost;

  return (
    <form action={action} className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="title" label={t.admin.fields.title} required defaultValue={post?.title} />
        <Field name="slug" label={t.admin.fields.slug} defaultValue={post?.slug} />
        <Field name="cover_image_url" label={t.admin.fields.coverImageUrl} defaultValue={post?.cover_image_url} />
        <Field name="published_at" label={t.admin.fields.publishedAt} type="datetime-local" defaultValue={toDateInput(post?.published_at)} />
      </div>
      <label className="block">
        <span className="text-sm text-slate-300">{t.admin.fields.status}</span>
        <select
          name="status"
          defaultValue={post?.status ?? "draft"}
          className="mt-1 w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
        >
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
      </label>
      <TextArea name="excerpt" label={t.admin.fields.excerpt} rows={3} defaultValue={post?.excerpt} />
      <TextArea name="tags" label={`${t.admin.fields.tags} (${t.admin.hints.list})`} rows={3} defaultValue={post?.tags?.join("\n")} />
      <TextArea name="content" label={t.admin.fields.content} rows={18} defaultValue={post?.content} />
      <Button className="w-fit bg-cyan-400 text-slate-950 hover:bg-cyan-300">
        {post ? t.admin.updatePost : t.admin.createPost}
      </Button>
    </form>
  );
}

function toDateInput(value?: string | null) {
  if (!value) {
    return "";
  }

  return new Date(value).toISOString().slice(0, 16);
}

function Field({
  name,
  label,
  defaultValue,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm text-slate-300">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="mt-1 w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
      />
    </label>
  );
}

function TextArea({
  name,
  label,
  defaultValue,
  rows = 5,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="text-sm text-slate-300">{label}</span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        className="mt-1 w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
      />
    </label>
  );
}
