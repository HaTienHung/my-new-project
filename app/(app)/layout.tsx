import Footer from "../ui/footer/footer";
import Header from "../ui/header/header";

// app/cms/layout.tsx
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main>{children}</main> {/* Nội dung chính */}
      <Footer />
    </div>
  );
}
