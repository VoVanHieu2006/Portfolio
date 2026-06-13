import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageFrame, SiteFooter, SiteHeader } from "@/components/site/site-shell";
import { getDictionary } from "@/lib/i18n";
import { createMessage } from "@/lib/portfolio/actions";
import { absoluteUrl, isImageUrl } from "@/lib/portfolio/format";
import { getSiteProfile } from "@/lib/portfolio/queries";

export const dynamic = "force-dynamic";

export default async function CvPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const [{ sent }, t, profile] = await Promise.all([
    searchParams,
    getDictionary(),
    getSiteProfile(),
  ]);
  const resumeUrl = absoluteUrl(profile?.resume_url);

  return (
    <main className="min-h-screen bg-slate-950">
      <SiteHeader profile={profile} />
      <PageFrame>
        <section className="mx-auto w-full max-w-5xl px-4 py-16">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{t.cv.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">{t.cv.title}</h1>
          <p className="mt-4 max-w-2xl text-slate-400">{t.cv.description}</p>

          <div className="mt-10 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-2xl shadow-cyan-950/20">
            <div className="flex flex-col gap-3 border-b border-white/10 p-4 md:flex-row md:items-center md:justify-between">
              <h2 className="font-semibold text-white">{t.cv.previewTitle}</h2>
              {resumeUrl && (
                <Button asChild className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                  <a href={resumeUrl} target="_blank" rel="noreferrer">
                    <Download /> {t.common.downloadCv}
                  </a>
                </Button>
              )}
            </div>
            {resumeUrl ? (
              <CvPreview url={resumeUrl} />
            ) : (
              <div className="p-10 text-center">
                <h3 className="text-lg font-semibold text-white">{t.cv.noResumeTitle}</h3>
                <p className="mt-2 text-sm text-slate-400">{t.cv.noResumeDescription}</p>
              </div>
            )}
          </div>

          <section className="mt-12 rounded-lg border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold text-white">{t.cv.contactTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{t.cv.contactDescription}</p>
              {profile?.email && (
                <p className="mt-3 rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-200">
                  {t.common.email}: {profile.email}
                </p>
              )}
            </div>
            {sent === "1" && (
              <p className="mt-5 rounded-md border border-cyan-300/30 bg-cyan-300/10 p-3 text-sm text-cyan-100">
                {t.cv.sent}
              </p>
            )}
            <form action={createMessage} className="mt-6 grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input name="name" required placeholder={t.cv.name} className="w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300" />
                <input name="email" type="email" required placeholder={t.cv.email} className="w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300" />
              </div>
              <textarea name="message" required rows={7} placeholder={t.cv.message} className="w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300" />
              <Button className="w-full bg-violet-500 text-white hover:bg-violet-400 md:w-fit">{t.cv.send}</Button>
            </form>
          </section>
        </section>
      </PageFrame>
      <SiteFooter profile={profile} />
    </main>
  );
}

function CvPreview({ url }: { url: string }) {
  if (isImageUrl(url)) {
    return <img src={url} alt="CV" className="mx-auto w-full bg-white object-contain" />;
  }

  return (
    <iframe
      src={url}
      title="CV"
      className="h-[75vh] w-full bg-white"
    />
  );
}
