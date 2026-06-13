import { Button } from "@/components/ui/button";
import { AdminCard, AdminHeader } from "@/components/admin/admin-shell";
import { getDictionary, getLocale } from "@/lib/i18n";
import { deleteMessage, toggleMessageRead } from "@/lib/portfolio/actions";
import { formatDate } from "@/lib/portfolio/format";
import { getMessages } from "@/lib/portfolio/queries";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const [t, locale, messages] = await Promise.all([
    getDictionary(),
    getLocale(),
    getMessages(),
  ]);

  return (
    <>
      <AdminHeader title={t.admin.messages} description={t.admin.messagesDescription} />
      <div className="space-y-3">
        {messages.map((message) => (
          <AdminCard key={message.id}>
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-semibold text-white">{message.name}</h2>
                  <a className="text-sm text-cyan-300 hover:underline" href={`mailto:${message.email}`}>{message.email}</a>
                  <span className={message.is_read ? "text-xs text-slate-500" : "text-xs text-violet-300"}>
                    {message.is_read ? t.admin.read : t.admin.unread}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">{formatDate(message.created_at, locale)}</p>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-300">{message.message}</p>
              </div>
              <div className="flex gap-2">
                <form action={toggleMessageRead}>
                  <input type="hidden" name="id" value={message.id} />
                  <input type="hidden" name="is_read" value={String(message.is_read)} />
                  <Button variant="outline" size="sm" className="border-white/10 bg-transparent text-white">
                    {message.is_read ? t.admin.unread : t.admin.read}
                  </Button>
                </form>
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={message.id} />
                  <Button variant="destructive" size="sm">{t.admin.delete}</Button>
                </form>
              </div>
            </div>
          </AdminCard>
        ))}
        {!messages.length && <AdminCard><p className="text-sm text-slate-400">{t.admin.noMessages}</p></AdminCard>}
      </div>
    </>
  );
}
