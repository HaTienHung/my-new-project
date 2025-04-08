// app/cms/layout.tsx
import SideNav from '@/app/ui/cms/dashboard/sidenav';
import Image from 'next/image';
import Link from 'next/link';
import { IoLogOut } from 'react-icons/io5';

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:flex sm:flex-col min-h-screen">
      <div className='flex justify-between items-center'>
        <SideNav />
        <div className="md:hidden">
          <Image src="/next.svg" alt="Logo" width={120} height={40} />
        </div>
        {/* Logout */}
        <Link
          href="/"
          className=" text-2xl flex items-center p-3 hover:bg-gray-100 text-[rgb(121,100,73)] md:hidden"
        >
          <IoLogOut />
        </Link>
      </div>
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
