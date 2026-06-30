export default function AdminLoading() {
  return (
    <div className="admin-loading-pulse space-y-6">
      <div className="h-8 w-48 rounded-md bg-[var(--z-border)]" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-lg border bg-white" style={{ borderColor: 'var(--z-border)' }} />
        ))}
      </div>
      <div className="h-72 rounded-lg border bg-white" style={{ borderColor: 'var(--z-border)' }} />
    </div>
  );
}
