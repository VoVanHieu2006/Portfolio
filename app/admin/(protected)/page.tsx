import { AdminCard, AdminHeader } from "@/components/admin/admin-shell";
import { getDictionary } from "@/lib/i18n";
import { getDashboardStats } from "@/lib/portfolio/queries";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [t, stats] = await Promise.all([getDictionary(), getDashboardStats()]);
  const cards = [
    [t.admin.totalProjects, stats.projects],
    [t.admin.publishedPosts, stats.publishedPosts],
    [t.admin.draftPosts, stats.draftPosts],
    [t.admin.unreadMessages, stats.unreadMessages],
  ];

  return (
    <>
      <AdminHeader title={t.admin.dashboard} description={t.admin.dashboardDescription} />
      <div className="grid gap-4 md:grid-cols-4">
        {cards.map(([label, value]) => (
          <AdminCard key={label.toString()}>
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
          </AdminCard>
        ))}
      </div>
    </>
  );
}
