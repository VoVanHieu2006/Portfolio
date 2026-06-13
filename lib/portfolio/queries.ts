import { createClient } from "@/lib/supabase/server";
import type {
  BlogPost,
  ContactMessage,
  DashboardStats,
  Project,
  SiteProfile,
  Skill,
} from "./types";
import { normalizeSkillGroup } from "./format";

export async function getSiteProfile() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_profile")
    .select("*")
    .limit(1)
    .maybeSingle<SiteProfile>();

  if (error) {
    console.error("Failed to load site profile", error.message);
  }

  return data;
}

export async function getFeaturedProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("order_index", { ascending: true, nullsFirst: false })
    .returns<Project[]>();

  if (error) {
    console.error("Failed to load featured projects", error.message);
  }

  return data ?? [];
}

export async function getPublishedProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("order_index", { ascending: true, nullsFirst: false })
    .returns<Project[]>();

  if (error) {
    console.error("Failed to load projects", error.message);
  }

  return data ?? [];
}

export async function getAllProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("order_index", { ascending: true, nullsFirst: false })
    .returns<Project[]>();

  if (error) {
    console.error("Failed to load admin projects", error.message);
  }

  return data ?? [];
}

export async function getProject(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle<Project>();

  if (error) {
    console.error("Failed to load project", error.message);
  }

  return data;
}

export async function getPublishedProjectBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle<Project>();

  if (error) {
    console.error("Failed to load published project", error.message);
  }

  return data;
}

export async function getLatestPosts(limit = 3) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(limit)
    .returns<BlogPost[]>();

  if (error) {
    console.error("Failed to load latest posts", error.message);
  }

  return data ?? [];
}

export async function getPublishedPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .returns<BlogPost[]>();

  if (error) {
    console.error("Failed to load posts", error.message);
  }

  return data ?? [];
}

export async function getPublishedPostBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle<BlogPost>();

  if (error) {
    console.error("Failed to load post", error.message);
  }

  return data;
}

export async function getAllPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<BlogPost[]>();

  if (error) {
    console.error("Failed to load admin posts", error.message);
  }

  return data ?? [];
}

export async function getPost(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle<BlogPost>();

  if (error) {
    console.error("Failed to load admin post", error.message);
  }

  return data;
}

export async function getSkills() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("category", { ascending: true })
    .order("order_index", { ascending: true, nullsFirst: false })
    .returns<Skill[]>();

  if (error) {
    console.error("Failed to load skills", error.message);
  }

  return data ?? [];
}

export async function getMessages() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<ContactMessage[]>();

  if (error) {
    console.error("Failed to load messages", error.message);
  }

  return data ?? [];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();
  const [
    projects,
    publishedPosts,
    draftPosts,
    unreadMessages,
  ] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase
      .from("blog_posts")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("blog_posts")
      .select("id", { count: "exact", head: true })
      .eq("status", "draft"),
    supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("is_read", false),
  ]);

  return {
    projects: projects.count ?? 0,
    publishedPosts: publishedPosts.count ?? 0,
    draftPosts: draftPosts.count ?? 0,
    unreadMessages: unreadMessages.count ?? 0,
  };
}

export function groupSkills(skills: Skill[]) {
  return skills.reduce<Record<string, Skill[]>>((groups, skill) => {
    const category = skill.category || "Other";
    groups[category] = groups[category] ?? [];
    groups[category].push(skill);
    return groups;
  }, {});
}

export function splitSkills(skills: Skill[]) {
  return skills.reduce<{ hard: Skill[]; soft: Skill[] }>(
    (groups, skill) => {
      groups[normalizeSkillGroup(skill.category)].push(skill);
      return groups;
    },
    { hard: [], soft: [] },
  );
}
