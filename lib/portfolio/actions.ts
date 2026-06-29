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
import type { SupabaseClient } from "@supabase/supabase-js";

async function getSupabase(): Promise<SupabaseClient> {
  const supabase = await createClient();
  if (!supabase) {
    throw new Error("Supabase client is not initialized");
  }
  return supabase;
}

function sanitizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function isSchemaCacheColumnError(error: { code?: string; message?: string } | null) {
  if (!error) {
    return false;
  }

  return (
    error.code === "PGRST204" ||
    /schema cache|could not find .* column/i.test(error.message ?? "")
  );
}

function profilePayload(formData: FormData) {
  return {
    full_name: getString(formData, "full_name_vi") || getString(formData, "full_name_en") || "",
    full_name_vi: getString(formData, "full_name_vi") || null,
    full_name_en: getString(formData, "full_name_en") || null,
    headline: getString(formData, "headline_vi") || getString(formData, "headline_en") || "",
    headline_vi: getString(formData, "headline_vi") || null,
    headline_en: getString(formData, "headline_en") || null,
    bio: getString(formData, "bio_vi") || getString(formData, "bio_en") || "",
    bio_vi: getString(formData, "bio_vi") || null,
    bio_en: getString(formData, "bio_en") || null,
    avatar_url: absoluteUrl(getString(formData, "avatar_url")),
    email: getString(formData, "email"),
    github_url: absoluteUrl(getString(formData, "github_url")),
    linkedin_url: absoluteUrl(getString(formData, "linkedin_url")),
    resume_url: absoluteUrl(getString(formData, "resume_url")),
  };
}

function legacyProfilePayload(formData: FormData) {
  return {
    full_name: getString(formData, "full_name_vi") ?? getString(formData, "full_name_en"),
    headline: getString(formData, "headline_vi") ?? getString(formData, "headline_en"),
    bio: getString(formData, "bio_vi") ?? getString(formData, "bio_en"),
    avatar_url: absoluteUrl(getString(formData, "avatar_url")),
    email: getString(formData, "email"),
    github_url: absoluteUrl(getString(formData, "github_url")),
    linkedin_url: absoluteUrl(getString(formData, "linkedin_url")),
    resume_url: absoluteUrl(getString(formData, "resume_url")),
  };
}

export async function saveProfile(formData: FormData) {
  await requireAdmin();
  const supabase = await getSupabase();
  const id = getString(formData, "id");

  // Debug: Log form data
  console.log("=== DEBUG FORM DATA ===");
  console.log("full_name_vi:", getString(formData, "full_name_vi"));
  console.log("full_name_en:", getString(formData, "full_name_en"));
  console.log("headline_vi:", getString(formData, "headline_vi"));
  console.log("headline_en:", getString(formData, "headline_en"));
  console.log("bio_vi:", getString(formData, "bio_vi"));
  console.log("bio_en:", getString(formData, "bio_en"));

  const payload = profilePayload(formData);
  console.log("=== PAYLOAD TO SAVE ===");
  console.log(JSON.stringify(payload, null, 2));

  let result = id
    ? await supabase.from("site_profile").update(payload).eq("id", id)
    : await supabase.from("site_profile").insert(payload);
  if (isSchemaCacheColumnError(result.error)) {
    result = id
      ? await supabase.from("site_profile").update(legacyProfilePayload(formData)).eq("id", id)
      : await supabase.from("site_profile").insert(legacyProfilePayload(formData));
  }

  if (result.error) {
    throw new Error(result.error.message);
  }

  revalidatePath("/");
  revalidatePath("/cv");
  revalidatePath("/admin/profile");
}

function projectPayload(formData: FormData) {
  const title =
    getString(formData, "title_vi") ??
    getString(formData, "title_en") ??
    getRequiredString(formData, "title");
  const slug = getString(formData, "slug") ?? sanitizeSlug(title);
  return {
    slug,
    title,
    title_vi: getString(formData, "title_vi"),
    title_en: getString(formData, "title_en"),
    short_description: getString(formData, "short_description_vi") ?? getString(formData, "short_description_en"),
    short_description_vi: getString(formData, "short_description_vi"),
    short_description_en: getString(formData, "short_description_en"),
    problem: getString(formData, "problem_vi") ?? getString(formData, "problem_en"),
    problem_vi: getString(formData, "problem_vi"),
    problem_en: getString(formData, "problem_en"),
    solution: getString(formData, "solution_vi") ?? getString(formData, "solution_en"),
    solution_vi: getString(formData, "solution_vi"),
    solution_en: getString(formData, "solution_en"),
    my_role: getString(formData, "my_role_vi") ?? getString(formData, "my_role_en"),
    my_role_vi: getString(formData, "my_role_vi"),
    my_role_en: getString(formData, "my_role_en"),
    tech_stack: splitList(formData.get("tech_stack")),
    key_features: splitList(formData.get("key_features_vi")).length
      ? splitList(formData.get("key_features_vi"))
      : splitList(formData.get("key_features_en")),
    key_features_vi: splitList(formData.get("key_features_vi")),
    key_features_en: splitList(formData.get("key_features_en")),
    lessons_learned: getString(formData, "lessons_learned_vi") ?? getString(formData, "lessons_learned_en"),
    lessons_learned_vi: getString(formData, "lessons_learned_vi"),
    lessons_learned_en: getString(formData, "lessons_learned_en"),
    github_url: absoluteUrl(getString(formData, "github_url")),
    demo_url: absoluteUrl(getString(formData, "demo_url")),
    cover_image_url: absoluteUrl(getString(formData, "cover_image_url")),
    featured: isChecked(formData, "featured"),
    published: isChecked(formData, "published"),
    order_index: getNumber(formData, "order_index"),
  };
}

function legacyProjectPayload(formData: FormData) {
  const title =
    getString(formData, "title_vi") ??
    getString(formData, "title_en") ??
    getRequiredString(formData, "title");
  const slug = getString(formData, "slug") ?? sanitizeSlug(title);
  const keyFeaturesVi = splitList(formData.get("key_features_vi"));
  return {
    slug,
    title,
    short_description: getString(formData, "short_description_vi") ?? getString(formData, "short_description_en"),
    problem: getString(formData, "problem_vi") ?? getString(formData, "problem_en"),
    solution: getString(formData, "solution_vi") ?? getString(formData, "solution_en"),
    my_role: getString(formData, "my_role_vi") ?? getString(formData, "my_role_en"),
    tech_stack: splitList(formData.get("tech_stack")),
    key_features: keyFeaturesVi.length ? keyFeaturesVi : splitList(formData.get("key_features_en")),
    lessons_learned: getString(formData, "lessons_learned_vi") ?? getString(formData, "lessons_learned_en"),
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
  const supabase = await getSupabase();
  let { error } = await supabase.from("projects").insert(projectPayload(formData));

  if (isSchemaCacheColumnError(error)) {
    const retry = await supabase.from("projects").insert(legacyProjectPayload(formData));
    error = retry.error;
  }

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
  const supabase = await getSupabase();
  let { error } = await supabase
    .from("projects")
    .update(projectPayload(formData))
    .eq("id", id);
  if (isSchemaCacheColumnError(error)) {
    const retry = await supabase
      .from("projects")
      .update(legacyProjectPayload(formData))
      .eq("id", id);
    error = retry.error;
  }

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
  const supabase = await getSupabase();
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
  const supabase = await getSupabase();
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
  const supabase = await getSupabase();
  const { error } = await supabase.from("projects").update({ featured }).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

function postPayload(formData: FormData) {
  const title =
    getString(formData, "title_vi") ??
    getString(formData, "title_en") ??
    getRequiredString(formData, "title");
  const slug = getString(formData, "slug") ?? sanitizeSlug(title);
  const status = getString(formData, "status") === "published" ? "published" : "draft";
  const publishedAt = getString(formData, "published_at");

  return {
    slug,
    title,
    title_vi: getString(formData, "title_vi"),
    title_en: getString(formData, "title_en"),
    excerpt: getString(formData, "excerpt_vi") ?? getString(formData, "excerpt_en"),
    excerpt_vi: getString(formData, "excerpt_vi"),
    excerpt_en: getString(formData, "excerpt_en"),
    content: getString(formData, "content_vi") ?? getString(formData, "content_en"),
    content_vi: getString(formData, "content_vi"),
    content_en: getString(formData, "content_en"),
    cover_image_url: absoluteUrl(getString(formData, "cover_image_url")),
    tags: splitList(formData.get("tags_vi")).length
      ? splitList(formData.get("tags_vi"))
      : splitList(formData.get("tags_en")),
    tags_vi: splitList(formData.get("tags_vi")),
    tags_en: splitList(formData.get("tags_en")),
    status,
    published_at:
      status === "published" ? publishedAt ?? new Date().toISOString() : publishedAt,
  };
}

function legacyPostPayload(formData: FormData) {
  const title =
    getString(formData, "title_vi") ??
    getString(formData, "title_en") ??
    getRequiredString(formData, "title");
  const slug = getString(formData, "slug") ?? sanitizeSlug(title);
  const status = getString(formData, "status") === "published" ? "published" : "draft";
  const publishedAt = getString(formData, "published_at");
  const tagsVi = splitList(formData.get("tags_vi"));

  return {
    slug,
    title,
    excerpt: getString(formData, "excerpt_vi") ?? getString(formData, "excerpt_en"),
    content: getString(formData, "content_vi") ?? getString(formData, "content_en"),
    cover_image_url: absoluteUrl(getString(formData, "cover_image_url")),
    tags: tagsVi.length ? tagsVi : splitList(formData.get("tags_en")),
    status,
    published_at:
      status === "published" ? publishedAt ?? new Date().toISOString() : publishedAt,
  };
}

export async function createPost(formData: FormData) {
  await requireAdmin();
  const supabase = await getSupabase();
  let { error } = await supabase.from("blog_posts").insert(postPayload(formData));

  if (isSchemaCacheColumnError(error)) {
    const retry = await supabase.from("blog_posts").insert(legacyPostPayload(formData));
    error = retry.error;
  }

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
  const supabase = await getSupabase();
  let { error } = await supabase
    .from("blog_posts")
    .update(postPayload(formData))
    .eq("id", id);

  if (isSchemaCacheColumnError(error)) {
    const retry = await supabase
      .from("blog_posts")
      .update(legacyPostPayload(formData))
      .eq("id", id);
    error = retry.error;
  }

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
  const supabase = await getSupabase();
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
  const supabase = await getSupabase();
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
  const name =
    getString(formData, "name_vi") ??
    getString(formData, "name_en") ??
    getRequiredString(formData, "name");

  return {
    category: getRequiredString(formData, "category"),
    name,
    name_vi: getString(formData, "name_vi"),
    name_en: getString(formData, "name_en"),
  };
}

function legacySkillPayload(formData: FormData) {
  const name =
    getString(formData, "name_vi") ??
    getString(formData, "name_en") ??
    getRequiredString(formData, "name");

  return {
    category: getRequiredString(formData, "category"),
    name,
  };
}

export async function createSkill(formData: FormData) {
  await requireAdmin();
  const supabase = await getSupabase();
  let { error } = await supabase.from("skills").insert(skillPayload(formData));

  if (isSchemaCacheColumnError(error)) {
    const retry = await supabase.from("skills").insert(legacySkillPayload(formData));
    error = retry.error;
  }

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
  const supabase = await getSupabase();
  let { error } = await supabase.from("skills").update(skillPayload(formData)).eq("id", id);

  if (isSchemaCacheColumnError(error)) {
    const retry = await supabase.from("skills").update(legacySkillPayload(formData)).eq("id", id);
    error = retry.error;
  }

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
  const supabase = await getSupabase();
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
  const supabase = await getSupabase();
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
  const supabase = await getSupabase();
  const { error } = await supabase.from("contact_messages").update({ is_read }).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/messages");
}

export async function deleteMessage(formData: FormData) {
  await requireAdmin();
  const id = getRequiredString(formData, "id");
  const supabase = await getSupabase();
  const { error } = await supabase.from("contact_messages").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/messages");
}

