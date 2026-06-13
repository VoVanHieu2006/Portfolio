export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16">
      <div className="mx-auto max-w-6xl animate-pulse space-y-6">
        <div className="h-4 w-32 rounded bg-cyan-300/20" />
        <div className="h-12 w-2/3 rounded bg-white/10" />
        <div className="h-24 w-full max-w-2xl rounded bg-white/5" />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="h-64 rounded-lg border border-white/10 bg-white/[0.04]" />
          <div className="h-64 rounded-lg border border-white/10 bg-white/[0.04]" />
        </div>
      </div>
    </main>
  );
}
