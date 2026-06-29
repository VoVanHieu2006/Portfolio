export type SiteProfile = {
  id?: string;
  full_name: string | null;
  full_name_vi?: string | null;
  full_name_en?: string | null;
  headline: string | null;
  headline_vi?: string | null;
  headline_en?: string | null;
  bio: string | null;
  bio_vi?: string | null;
  bio_en?: string | null;
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
  title_vi?: string | null;
  title_en?: string | null;
  short_description: string | null;
  short_description_vi?: string | null;
  short_description_en?: string | null;
  problem: string | null;
  problem_vi?: string | null;
  problem_en?: string | null;
  solution: string | null;
  solution_vi?: string | null;
  solution_en?: string | null;
  my_role: string | null;
  my_role_vi?: string | null;
  my_role_en?: string | null;
  tech_stack: string[] | null;
  key_features: string[] | null;
  key_features_vi?: string[] | null;
  key_features_en?: string[] | null;
  lessons_learned: string | null;
  lessons_learned_vi?: string | null;
  lessons_learned_en?: string | null;
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
  title_vi?: string | null;
  title_en?: string | null;
  excerpt: string | null;
  excerpt_vi?: string | null;
  excerpt_en?: string | null;
  content: string | null;
  content_vi?: string | null;
  content_en?: string | null;
  cover_image_url: string | null;
  tags: string[] | null;
  tags_vi?: string[] | null;
  tags_en?: string[] | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type Skill = {
  id: string;
  category: string;
  name: string;
  name_vi?: string | null;
  name_en?: string | null;
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
