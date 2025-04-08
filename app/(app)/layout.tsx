import { Providers } from "../provider";
import Footer from "../ui/app/footer/footer";
import Header from "../ui/app/header/header";

// app/cms/layout.tsx
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Providers>
        <Header />
        <main>{children}</main> {/* Nội dung chính */}
        <Footer />
      </Providers>
    </div>
  );
}
