# Graph Report - personal-portfolio  (2026-07-01)

## Corpus Check
- 121 files · ~50,641 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 501 nodes · 933 edges · 27 communities (22 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5ce7cf1a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]

## God Nodes (most connected - your core abstractions)
1. `createClient()` - 21 edges
2. `requireAdmin()` - 19 edges
3. `getRequiredString()` - 19 edges
4. `Button` - 18 edges
5. `getSupabase()` - 18 edges
6. `getSupabase()` - 17 edges
7. `compilerOptions` - 17 edges
8. `validate()` - 14 edges
9. `compress_file()` - 12 edges
10. `getString()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `LinksManagerProps` --references--> `ProjectLink`  [EXTRACTED]
  components/admin/links-manager.tsx → lib/portfolio/types.ts
- `ProjectForm()` --calls--> `getDictionary()`  [EXTRACTED]
  components/admin/project-form.tsx → lib/i18n.ts
- `BlogCard()` --calls--> `getLocale()`  [EXTRACTED]
  components/site/blog-card.tsx → lib/i18n.ts
- `getSupabase()` --calls--> `createClient()`  [EXTRACTED]
  portfolio/actions.ts → supabase/server.ts
- `getSiteProfile()` --calls--> `createClient()`  [EXTRACTED]
  portfolio/queries.ts → supabase/server.ts

## Import Cycles
- None detected.

## Communities (27 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.10
Nodes (28): components::c_users_acer_desktop_portfolio_personal_portfolio_lib_supabase_client_createclient, components::c_users_acer_desktop_portfolio_personal_portfolio_lib_supabase_client_ts, components::c_users_acer_desktop_portfolio_personal_portfolio_lib_supabase_server_createclient, components::c_users_acer_desktop_portfolio_personal_portfolio_lib_supabase_server_ts, components::c_users_acer_desktop_portfolio_personal_portfolio_lib_utils_cn, components::c_users_acer_desktop_portfolio_personal_portfolio_lib_utils_ts, components::class_variance_authority, components::link (+20 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (25): BlogForm(), toDateInput(), LinksManager(), LinksManagerProps, components::c_users_acer_desktop_portfolio_personal_portfolio_lib_i18n_getdictionary, components::c_users_acer_desktop_portfolio_personal_portfolio_lib_i18n_getlocale, components::c_users_acer_desktop_portfolio_personal_portfolio_lib_i18n_ts, components::c_users_acer_desktop_portfolio_personal_portfolio_lib_portfolio_actions_createpost (+17 more)

### Community 2 - "Community 2"
Cohesion: 0.16
Nodes (36): lib::cache, createMessage(), createPost(), createProject(), createSkill(), deleteMessage(), deletePost(), deleteProject() (+28 more)

### Community 3 - "Community 3"
Cohesion: 0.11
Nodes (27): lib::headers, lib::navigation, getCurrentUserClaims(), isAdminUser(), getAllPosts(), getAllProjects(), getDashboardStats(), getFeaturedProjects() (+19 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (23): components::c_users_acer_desktop_portfolio_personal_portfolio_components_ui_dropdown_menu_dropdownmenu, components::c_users_acer_desktop_portfolio_personal_portfolio_components_ui_dropdown_menu_dropdownmenuradiogroup, components::c_users_acer_desktop_portfolio_personal_portfolio_components_ui_dropdown_menu_dropdownmenutrigger, components::lucide_react, components::next_themes, components::react_checkbox, components::react_dropdown_menu, ThemeSwitcher() (+15 more)

### Community 5 - "Community 5"
Cohesion: 0.12
Nodes (19): BlogDetailPage(), ProjectDetailPage(), LinksManager(), LinksManagerProps, ProjectForm(), BlogCard(), ProjectCard(), Dictionary (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.18
Nodes (5): lib::c_users_acer_desktop_portfolio_personal_portfolio_lib_utils_hasenvvars, lib::clsx, lib::server, lib::ssr, lib::tailwind_merge

### Community 7 - "Community 7"
Cohesion: 0.40
Nodes (5): Dictionary, getDictionary(), getLocale(), Locale, locales

### Community 12 - "Community 12"
Cohesion: 0.12
Nodes (27): main(), print_usage(), backup_dir_for(), build_compress_prompt(), build_fix_prompt(), call_claude(), compress_file(), is_sensitive_path() (+19 more)

### Community 13 - "Community 13"
Cohesion: 0.18
Nodes (27): createMessage(), createPost(), createProject(), createSkill(), deleteMessage(), deletePost(), deleteProject(), deleteSkill() (+19 more)

### Community 14 - "Community 14"
Cohesion: 0.16
Nodes (22): benchmark_pair(), count_tokens(), main(), print_table(), Path, count_bullets(), extract_code_blocks(), extract_headings() (+14 more)

### Community 15 - "Community 15"
Cohesion: 0.09
Nodes (20): Before / After, Benchmarks, How It Work, <img src="../../docs/assets/dancing-rock.svg" width="20" height="20" alt="rock"/> Caveman (285 tokens), Install, 📄 Original (706 tokens), Part of Caveman, Security (+12 more)

### Community 16 - "Community 16"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+12 more)

### Community 17 - "Community 17"
Cohesion: 0.14
Nodes (12): caveman-help, Example output, How to invoke, See also, What it does, Caveman Help, Configure Default Mode, Deactivate (+4 more)

### Community 18 - "Community 18"
Cohesion: 0.15
Nodes (11): cavecrew, Example chaining, How to invoke, See also, What it does, Auto-clarity (inherited), Chaining patterns, Output contracts (+3 more)

### Community 19 - "Community 19"
Cohesion: 0.17
Nodes (11): Boundaries, Caveman Compress, Compress, Compression Rules, Pattern, Preserve EXACTLY (never modify), Preserve Structure, Process (+3 more)

### Community 20 - "Community 20"
Cohesion: 0.17
Nodes (10): caveman, Example output, How to invoke, See also, What it does, Auto-Clarity, Boundaries, Intensity (+2 more)

### Community 21 - "Community 21"
Cohesion: 0.18
Nodes (9): caveman-commit, Example output, How to invoke, See also, What it does, Auto-Clarity, Boundaries, Examples (+1 more)

### Community 22 - "Community 22"
Cohesion: 0.18
Nodes (9): caveman-review, Example output, How to invoke, See also, What it does, Auto-Clarity, Boundaries, Examples (+1 more)

### Community 23 - "Community 23"
Cohesion: 0.29
Nodes (5): caveman-stats, Example output, How to invoke, See also, What it does

## Knowledge Gaps
- **121 isolated node(s):** `graphify`, `Workflow: graphify`, `What it does`, `How to invoke`, `Example chaining` (+116 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Button` connect `Community 0` to `Community 1`, `Community 4`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `createClient()` connect `Community 3` to `Community 2`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Why does `validate()` connect `Community 14` to `Community 12`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **What connects `graphify`, `Workflow: graphify`, `What it does` to the rest of the system?**
  _133 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09837092731829573 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.0602322206095791 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.11290322580645161 - nodes in this community are weakly interconnected._