alter table public.site_profile
  add column if not exists full_name_vi text,
  add column if not exists full_name_en text,
  add column if not exists headline_vi text,
  add column if not exists headline_en text,
  add column if not exists bio_vi text,
  add column if not exists bio_en text;

alter table public.projects
  add column if not exists title_vi text,
  add column if not exists title_en text,
  add column if not exists short_description_vi text,
  add column if not exists short_description_en text,
  add column if not exists problem_vi text,
  add column if not exists problem_en text,
  add column if not exists solution_vi text,
  add column if not exists solution_en text,
  add column if not exists my_role_vi text,
  add column if not exists my_role_en text,
  add column if not exists key_features_vi text[] default '{}',
  add column if not exists key_features_en text[] default '{}',
  add column if not exists lessons_learned_vi text,
  add column if not exists lessons_learned_en text;

alter table public.blog_posts
  add column if not exists title_vi text,
  add column if not exists title_en text,
  add column if not exists excerpt_vi text,
  add column if not exists excerpt_en text,
  add column if not exists content_vi text,
  add column if not exists content_en text,
  add column if not exists tags_vi text[] default '{}',
  add column if not exists tags_en text[] default '{}';

alter table public.skills
  add column if not exists name_vi text,
  add column if not exists name_en text;

update public.site_profile
set
  full_name_vi = coalesce(full_name_vi, full_name),
  full_name_en = coalesce(full_name_en, full_name),
  headline_vi = coalesce(headline_vi, headline),
  headline_en = coalesce(headline_en, headline),
  bio_vi = coalesce(bio_vi, bio),
  bio_en = coalesce(bio_en, bio);

update public.site_profile
set
  full_name = coalesce(full_name_vi, full_name),
  headline = coalesce(headline_vi, headline),
  bio = coalesce(bio_vi, bio);

update public.projects
set
  title_vi = coalesce(title_vi, title),
  title_en = coalesce(title_en, title),
  short_description_vi = coalesce(short_description_vi, short_description),
  short_description_en = coalesce(short_description_en, short_description),
  problem_vi = coalesce(problem_vi, problem),
  problem_en = coalesce(problem_en, problem),
  solution_vi = coalesce(solution_vi, solution),
  solution_en = coalesce(solution_en, solution),
  my_role_vi = coalesce(my_role_vi, my_role),
  my_role_en = coalesce(my_role_en, my_role),
  key_features_vi = coalesce(key_features_vi, key_features),
  key_features_en = coalesce(key_features_en, key_features),
  lessons_learned_vi = coalesce(lessons_learned_vi, lessons_learned),
  lessons_learned_en = coalesce(lessons_learned_en, lessons_learned);

update public.projects
set
  title = coalesce(title_vi, title),
  short_description = coalesce(short_description_vi, short_description),
  problem = coalesce(problem_vi, problem),
  solution = coalesce(solution_vi, solution),
  my_role = coalesce(my_role_vi, my_role),
  key_features = coalesce(key_features_vi, key_features),
  lessons_learned = coalesce(lessons_learned_vi, lessons_learned);

update public.blog_posts
set
  title_vi = coalesce(title_vi, title),
  title_en = coalesce(title_en, title),
  excerpt_vi = coalesce(excerpt_vi, excerpt),
  excerpt_en = coalesce(excerpt_en, excerpt),
  content_vi = coalesce(content_vi, content),
  content_en = coalesce(content_en, content),
  tags_vi = coalesce(tags_vi, tags),
  tags_en = coalesce(tags_en, tags);

update public.blog_posts
set
  title = coalesce(title_vi, title),
  excerpt = coalesce(excerpt_vi, excerpt),
  content = coalesce(content_vi, content),
  tags = coalesce(tags_vi, tags);

update public.skills
set
  name_vi = coalesce(name_vi, name),
  name_en = coalesce(name_en, name);

update public.skills
set
  name = coalesce(name_vi, name);

notify pgrst, 'reload schema';
