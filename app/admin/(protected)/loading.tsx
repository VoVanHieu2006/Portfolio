export default function AdminLoading() {
  return (
    <main className="min-h-screen bg-slate-950 p-8">
      <div className="animate-pulse space-y-6">
        <div className="h-10 w-64 rounded bg-white/10" />
        <div className="grid gap-4 md:grid-cols-4">
          <div className="h-28 rounded-lg border border-white/10 bg-white/[0.04]" />
          <div className="h-28 rounded-lg border border-white/10 bg-white/[0.04]" />
          <div className="h-28 rounded-lg border border-white/10 bg-white/[0.04]" />
          <div className="h-28 rounded-lg border border-white/10 bg-white/[0.04]" />
        </div>
      </div>
    </main>
  );
}
