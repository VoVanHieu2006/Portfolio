create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

create table if not exists public.site_profile (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  headline text,
  bio text,
  avatar_url text,
  email text,
  github_url text,
  linkedin_url text,
  resume_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  short_description text,
  problem text,
  solution text,
  my_role text,
  tech_stack text[] default '{}',
  key_features text[] default '{}',
  lessons_learned text,
  github_url text,
  demo_url text,
  cover_image_url text,
  featured boolean default false,
  published boolean default false,
  order_index integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  cover_image_url text,
  tags text[] default '{}',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  evidence text,
  order_index integer,
  created_at timestamptz default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

alter table public.admin_profiles enable row level security;
alter table public.site_profile enable row level security;
alter table public.projects enable row level security;
alter table public.blog_posts enable row level security;
alter table public.skills enable row level security;
alter table public.contact_messages enable row level security;

create policy "Admins can read own admin profile"
  on public.admin_profiles for select
  to authenticated
  using (user_id = auth.uid());

create policy "Public can read site profile"
  on public.site_profile for select
  to anon, authenticated
  using (true);

create policy "Admins can manage site profile"
  on public.site_profile for all
  to authenticated
  using (exists (select 1 from public.admin_profiles where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_profiles where user_id = auth.uid()));

create policy "Public can read published projects"
  on public.projects for select
  to anon, authenticated
  using (published = true);

create policy "Admins can manage projects"
  on public.projects for all
  to authenticated
  using (exists (select 1 from public.admin_profiles where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_profiles where user_id = auth.uid()));

create policy "Public can read published posts"
  on public.blog_posts for select
  to anon, authenticated
  using (status = 'published');

create policy "Admins can manage posts"
  on public.blog_posts for all
  to authenticated
  using (exists (select 1 from public.admin_profiles where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_profiles where user_id = auth.uid()));

create policy "Public can read skills"
  on public.skills for select
  to anon, authenticated
  using (true);

create policy "Admins can manage skills"
  on public.skills for all
  to authenticated
  using (exists (select 1 from public.admin_profiles where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_profiles where user_id = auth.uid()));

create policy "Anyone can create contact messages"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

create policy "Admins can manage contact messages"
  on public.contact_messages for all
  to authenticated
  using (exists (select 1 from public.admin_profiles where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_profiles where user_id = auth.uid()));

insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

create policy "Public can read portfolio media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'portfolio-media');

create policy "Admins can upload portfolio media"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'portfolio-media'
    and exists (select 1 from public.admin_profiles where user_id = auth.uid())
  );
