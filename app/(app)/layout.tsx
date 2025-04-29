import { Providers } from "../providers";
import Footer from "../ui/app/footer/footer";
import Header from "../ui/app/header/header";

// app/cms/layout.tsx
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Providers>
        <Header />
        <div className="flex flex-col min-h-screen ">
          {/* Thêm class flex-grow để đẩy footer xuống */}
          <main className="flex-grow">{children}</main>
        </div>
        <Footer />
      </Providers>
    </div>
  );
}
