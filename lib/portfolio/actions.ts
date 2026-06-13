"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "./auth";
import {
  getNumber,
  getRequiredString,
  getString,
  isChecked,
  splitList,
  absoluteUrl,
} from "./format";

function sanitizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveProfile(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = getString(formData, "id");
  const payload = {
    full_name: getString(formData, "full_name"),
    headline: getString(formData, "headline"),
    bio: getString(formData, "bio"),
    avatar_url: absoluteUrl(getString(formData, "avatar_url")),
    email: getString(formData, "email"),
    github_url: absoluteUrl(getString(formData, "github_url")),
    linkedin_url: absoluteUrl(getString(formData, "linkedin_url")),
    resume_url: absoluteUrl(getString(formData, "resume_url")),
  };

  const result = id
    ? await supabase.from("site_profile").update(payload).eq("id", id)
    : await supabase.from("site_profile").insert(payload);

  if (result.error) {
    throw new Error(result.error.message);
  }

  revalidatePath("/");
  revalidatePath("/cv");
  revalidatePath("/admin/profile");
}

function projectPayload(formData: FormData) {
  const title = getRequiredString(formData, "title");
  const slug = getString(formData, "slug") ?? sanitizeSlug(title);

  return {
    slug,
    title,
    short_description: getString(formData, "short_description"),
    problem: getString(formData, "problem"),
    solution: getString(formData, "solution"),
    my_role: getString(formData, "my_role"),
    tech_stack: splitList(formData.get("tech_stack")),
    key_features: splitList(formData.get("key_features")),
    lessons_learned: getString(formData, "lessons_learned"),
    github_url: absoluteUrl(getString(formData, "github_url")),
    demo_url: absoluteUrl(getString(formData, "demo_url")),
    cover_image_url: absoluteUrl(getString(formData, "cover_image_url")),
    featured: isChecked(formData, "featured"),
    published: isChecked(formData, "published"),
    order_index: getNumber(formData, "order_index"),
  };
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("projects").insert(projectPayload(formData));

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update(projectPayload(formData))
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = getRequiredString(formData, "id");
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}

export async function toggleProjectPublished(formData: FormData) {
  await requireAdmin();
  const id = getRequiredString(formData, "id");
  const published = formData.get("published") !== "true";
  const supabase = await createClient();
  const { error } = await supabase.from("projects").update({ published }).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}

export async function toggleProjectFeatured(formData: FormData) {
  await requireAdmin();
  const id = getRequiredString(formData, "id");
  const featured = formData.get("featured") !== "true";
  const supabase = await createClient();
  const { error } = await supabase.from("projects").update({ featured }).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

function postPayload(formData: FormData) {
  const title = getRequiredString(formData, "title");
  const slug = getString(formData, "slug") ?? sanitizeSlug(title);
  const status = getString(formData, "status") === "published" ? "published" : "draft";
  const publishedAt = getString(formData, "published_at");

  return {
    slug,
    title,
    excerpt: getString(formData, "excerpt"),
    content: getString(formData, "content"),
    cover_image_url: absoluteUrl(getString(formData, "cover_image_url")),
    tags: splitList(formData.get("tags")),
    status,
    published_at:
      status === "published" ? publishedAt ?? new Date().toISOString() : publishedAt,
  };
}

export async function createPost(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").insert(postPayload(formData));

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updatePost(id: string, formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("blog_posts")
    .update(postPayload(formData))
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const id = getRequiredString(formData, "id");
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}

export async function togglePostPublished(formData: FormData) {
  await requireAdmin();
  const id = getRequiredString(formData, "id");
  const currentStatus = formData.get("status");
  const status = currentStatus === "published" ? "draft" : "published";
  const supabase = await createClient();
  const { error } = await supabase
    .from("blog_posts")
    .update({
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}

function skillPayload(formData: FormData) {
  return {
    category: getRequiredString(formData, "category"),
    name: getRequiredString(formData, "name"),
    evidence: getString(formData, "evidence"),
    order_index: getNumber(formData, "order_index"),
  };
}

export async function createSkill(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("skills").insert(skillPayload(formData));

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/cv");
  revalidatePath("/admin/skills");
}

export async function updateSkill(formData: FormData) {
  await requireAdmin();
  const id = getRequiredString(formData, "id");
  const supabase = await createClient();
  const { error } = await supabase.from("skills").update(skillPayload(formData)).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/cv");
  revalidatePath("/admin/skills");
}

export async function deleteSkill(formData: FormData) {
  await requireAdmin();
  const id = getRequiredString(formData, "id");
  const supabase = await createClient();
  const { error } = await supabase.from("skills").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/cv");
  revalidatePath("/admin/skills");
}

export async function createMessage(formData: FormData) {
  const name = getRequiredString(formData, "name");
  const email = getRequiredString(formData, "email");
  const message = getRequiredString(formData, "message");
  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    message,
    is_read: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/cv?sent=1");
}

export async function toggleMessageRead(formData: FormData) {
  await requireAdmin();
  const id = getRequiredString(formData, "id");
  const is_read = formData.get("is_read") !== "true";
  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").update({ is_read }).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/messages");
}

export async function deleteMessage(formData: FormData) {
  await requireAdmin();
  const id = getRequiredString(formData, "id");
  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/messages");
}
