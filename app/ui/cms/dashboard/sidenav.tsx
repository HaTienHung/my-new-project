'use client';

import Image from 'next/image';
import NavLinks from './nav-links';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import LogoutButton from '../auth/logout';

export default function SideNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Nút mở (hamburger) - chỉ hiện ở sm */}
      <div className="lg:hidden p-4">
        <button
          onClick={() => setOpen(true)}
          className="text-2xl text-primary"
        >
          <FaBars />
        </button>
      </div>

      {/* Overlay khi mở sidebar (chỉ ở mobile) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-md p-4 flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:static lg:translate-x-0 lg:h-screen
        `}
      >
        {/* Nút đóng - chỉ hiện ở mobile */}
        <div className="md:hidden mb-4 flex justify-end">
          <button
            onClick={() => setOpen(false)}
            className="text-2xl text-primary"
          >
            <FaTimes />
          </button>
        </div>

        {/* Logo */}
        <div className="mb-8 flex items-center justify-center mt-4">
          <Image src="/next.svg" alt="Logo" width={120} height={40} />
        </div>

        {/* Nav links */}
        <div className="flex-1">
          <NavLinks onClickLink={() => setOpen(false)} />
        </div>

        {/* Logout */}
        <LogoutButton isMobile={false} />
      </div>
    </>
  );
}
