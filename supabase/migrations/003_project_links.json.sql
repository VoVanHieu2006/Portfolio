-- Add links JSONB column to projects table for flexible multiple links
alter table public.projects
  add column if not exists links jsonb default '[]'::jsonb;

-- Example JSON structure:
-- [
--   {"label": "GitHub", "label_vi": "Mã nguồn", "label_en": "Source", "url": "https://github.com/user/repo", "icon": "github"},
--   {"label": "Demo", "label_vi": "Thử nghiệm", "label_en": "Demo", "url": "https://demo.example.com", "icon": "external-link"},
--   {"label": "Docs", "label_vi": "Tài liệu", "label_en": "Docs", "url": "https://docs.example.com", "icon": "book-open"}
-- ]
-- Icons: github, external-link, book-open, globe, link, etc. (lucide-react names)

-- Create GIN index for efficient JSONB queries
create index if not exists idx_projects_links on public.projects using gin (links);

notify pgrst, 'reload schema';