export default function Loading() {
  return (
    <main className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto max-w-6xl animate-pulse space-y-6">
        <div className="h-4 w-32 rounded bg-cyan-300/20" />
        <div className="h-12 w-2/3 rounded bg-muted" />
        <div className="h-24 w-full max-w-2xl rounded bg-muted/50" />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="h-64 rounded-lg border border-border bg-card" />
          <div className="h-64 rounded-lg border border-border bg-card" />
        </div>
      </div>
    </main>
  );
}
