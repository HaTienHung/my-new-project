// app/cms/layout.tsx
import SideNav from '@/app/ui/cms/dashboard/sidenav';
import Image from 'next/image';
import Link from 'next/link';
import { IoLogOut } from 'react-icons/io5';

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Header (mobile) + SideNav */}
      <div className="flex justify-between items-center md:flex-col md:items-start md:justify-start">
        <SideNav />

        {/* Logo mobile */}
        <div className="md:hidden">
          <Image src="/next.svg" alt="Logo" width={120} height={40} />
        </div>

        {/* Logout mobile */}
        <Link
          href="/"
          className="text-2xl flex items-center p-3 hover:bg-gray-100 text-[rgb(121,100,73)] md:hidden"
        >
          <IoLogOut />
        </Link>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto h-screen">
        {children}
      </main>
    </div>

  );
}
