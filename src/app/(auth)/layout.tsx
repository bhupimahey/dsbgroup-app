export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[60vh] bg-slate-50">
      {children}
    </div>
  );
}
