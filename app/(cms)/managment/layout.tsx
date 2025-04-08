// app/cms/layout.tsx
export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Không có Header/Footer */}
      {children}
    </div>
  );
}
