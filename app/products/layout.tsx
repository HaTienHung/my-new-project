export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Content Wrapper */}
      <main className="flex-grow">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
