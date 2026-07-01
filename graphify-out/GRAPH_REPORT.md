# Graph Report - personal-portfolio  (2026-07-01)

## Corpus Check
- 121 files · ~50,641 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 253 nodes · 567 edges · 12 communities (10 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `eb486c67`
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

## God Nodes (most connected - your core abstractions)
1. `createClient()` - 21 edges
2. `requireAdmin()` - 19 edges
3. `getRequiredString()` - 19 edges
4. `Button` - 18 edges
5. `getSupabase()` - 18 edges
6. `getString()` - 12 edges
7. `projectPayload()` - 10 edges
8. `legacyProjectPayload()` - 10 edges
9. `isSchemaCacheColumnError()` - 8 edges
10. `postPayload()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `getSupabase()` --calls--> `createClient()`  [EXTRACTED]
  portfolio/actions.ts → supabase/server.ts
- `getSiteProfile()` --calls--> `createClient()`  [EXTRACTED]
  portfolio/queries.ts → supabase/server.ts
- `getFeaturedProjects()` --calls--> `createClient()`  [EXTRACTED]
  portfolio/queries.ts → supabase/server.ts
- `getPublishedProjects()` --calls--> `createClient()`  [EXTRACTED]
  portfolio/queries.ts → supabase/server.ts
- `getAllProjects()` --calls--> `createClient()`  [EXTRACTED]
  portfolio/queries.ts → supabase/server.ts

## Import Cycles
- None detected.

## Communities (12 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.11
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
Cohesion: 0.13
Nodes (9): components::lucide_react, components::react_checkbox, CodeBlock(), client, create, rls, server, TutorialStep() (+1 more)

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (14): components::c_users_acer_desktop_portfolio_personal_portfolio_components_ui_dropdown_menu_dropdownmenu, components::c_users_acer_desktop_portfolio_personal_portfolio_components_ui_dropdown_menu_dropdownmenuradiogroup, components::c_users_acer_desktop_portfolio_personal_portfolio_components_ui_dropdown_menu_dropdownmenutrigger, components::next_themes, components::react_dropdown_menu, ThemeSwitcher(), DropdownMenuCheckboxItem, DropdownMenuContent (+6 more)

### Community 6 - "Community 6"
Cohesion: 0.18
Nodes (5): lib::c_users_acer_desktop_portfolio_personal_portfolio_lib_utils_hasenvvars, lib::clsx, lib::server, lib::ssr, lib::tailwind_merge

### Community 7 - "Community 7"
Cohesion: 0.40
Nodes (5): Dictionary, getDictionary(), getLocale(), Locale, locales

## Knowledge Gaps
- **20 isolated node(s):** `LinksManagerProps`, `Locale`, `create`, `rls`, `server` (+15 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Button` connect `Community 0` to `Community 1`, `Community 4`, `Community 5`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Why does `createClient()` connect `Community 3` to `Community 2`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `getSupabase()` connect `Community 2` to `Community 3`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **What connects `LinksManagerProps`, `Locale`, `create` to the rest of the system?**
  _20 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.10621942697414395 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.0602322206095791 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.11290322580645161 - nodes in this community are weakly interconnected._