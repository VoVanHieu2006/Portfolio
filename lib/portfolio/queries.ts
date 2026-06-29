import { createClient } from "@/lib/supabase/server";
import type { BlogPost, ContactMessage, DashboardStats, Project, SiteProfile, Skill } from "./types";

export async function getSiteProfile() {
  const supabase = await createClient();
  if (!supabase) return null;
  
  const client = supabase;
  const { data, error } = await client
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
  if (!supabase) return [];
  
  const client = supabase;
  const { data, error } = await client
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
  if (!supabase) return [];
  
  const client = supabase;
  const { data, error } = await client
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
  if (!supabase) return [];
  
  const client = supabase;
  const { data, error } = await client
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
  if (!supabase) return null;
  
  const client = supabase;
  const { data, error } = await client
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
  if (!supabase) return null;
  
  const client = supabase;
  const { data, error } = await client
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
  if (!supabase) return [];
  
  const client = supabase;
  const { data, error } = await client
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
  if (!supabase) return [];
  
  const client = supabase;
  const { data, error } = await client
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
  if (!supabase) return null;
  
  const client = supabase;
  const { data, error } = await client
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
  if (!supabase) return [];
  
  const client = supabase;
  const { data, error } = await client
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
  if (!supabase) return null;
  
  const client = supabase;
  const { data, error } = await client
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
  if (!supabase) return [];
  
  const client = supabase;
  const { data, error } = await client
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

export function splitSkills(skills: Skill[], columns = 2): Skill[][] {
  const result: Skill[][] = Array.from({ length: columns }, () => []);
  skills.forEach((skill, index) => {
    result[index % columns].push(skill);
  });
  return result;
}

export async function getMessages() {
  const supabase = await createClient();
  if (!supabase) return [];
  
  const client = supabase;
  const { data, error } = await client
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
  if (!supabase) {
    return {
      projects: 0,
      publishedPosts: 0,
      draftPosts: 0,
      unreadMessages: 0,
    };
  }
  
  const client = supabase;
  const [
    projects,
    publishedPosts,
    draftPosts,
    unreadMessages,
  ] = await Promise.all([
    client.from("projects").select("id", { count: "exact", head: true }),
    client
      .from("blog_posts")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    client
      .from("blog_posts")
      .select("id", { count: "exact", head: true })
      .eq("status", "draft"),
    client
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
