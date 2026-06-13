export type SiteProfile = {
  id?: string;
  full_name: string | null;
  headline: string | null;
  bio: string | null;
  avatar_url: string | null;
  email: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  resume_url: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  short_description: string | null;
  problem: string | null;
  solution: string | null;
  my_role: string | null;
  tech_stack: string[] | null;
  key_features: string[] | null;
  lessons_learned: string | null;
  github_url: string | null;
  demo_url: string | null;
  cover_image_url: string | null;
  featured: boolean;
  published: boolean;
  order_index: number | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  tags: string[] | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type Skill = {
  id: string;
  category: string;
  name: string;
  evidence: string | null;
  order_index: number | null;
  created_at?: string | null;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string | null;
};

export type DashboardStats = {
  projects: number;
  publishedPosts: number;
  draftPosts: number;
  unreadMessages: number;
};
