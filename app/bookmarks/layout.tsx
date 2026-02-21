export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="flex flex-col gap-20 md:max-w-5xl md:p-5">{children}</div>
    </main>
  );
}
