'use client';

import { FaHome, FaBox, FaShoppingCart, FaList } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Tổng quan', href: '/dashboard', icon: FaHome },
  { name: 'Quản lí sản phẩm', href: '/dashboard/products', icon: FaBox },
  { name: 'Quản lí đơn hàng', href: '/dashboard/orders', icon: FaShoppingCart },
  { name: 'Quản lí danh mục', href: '/dashboard/categories', icon: FaList },
];

export default function NavLinks({ onClickLink }: { onClickLink?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={onClickLink}
            className={clsx(
              'flex h-[48px] items-center gap-3 rounded-md p-3 text-lg font-medium hover:bg-gray-100 text-[rgb(121,100,73)]',
              { 'bg-sky-100 text-blue-600': pathname === link.href }
            )}
          >
            <LinkIcon className="w-6" />
            <span className="md:block">{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}
