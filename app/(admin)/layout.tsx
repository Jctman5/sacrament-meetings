export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-6 rounded border border-highlight bg-highlight-soft px-3 py-2 text-sm text-highlight">
        Leader area. Sign-in will be added in Week 05.
      </p>
      {children}
    </div>
  );
}
