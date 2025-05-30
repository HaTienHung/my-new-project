// app/cms/layout.tsx
import LogoutButton from '@/app/ui/cms/auth/logout';
import SideNav from '@/app/ui/cms/dashboard/sidenav';
import Image from 'next/image';


export default function CmsLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Header (mobile) + SideNav */}
      <div className="flex justify-between items-center lg:flex-col lg:items-start lg:justify-start">

        <SideNav />

        {/* Logo mobile */}
        <div className="lg:hidden">
          <Image src="/next.svg" alt="Logo" width={120} height={40} />
        </div>

        {/* Logout mobile */}
        <LogoutButton isMobile={true} />
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto h-screen">
        {children}
      </main>
    </div>

  );
}
