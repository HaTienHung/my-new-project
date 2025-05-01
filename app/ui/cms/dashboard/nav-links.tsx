'use client';

import { FaHome, FaBox, FaShoppingCart, FaList, FaWarehouse } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Tổng quan', href: '/cms/dashboard', icon: FaHome },
  { name: 'Quản lí sản phẩm', href: '/cms/products', icon: FaBox },
  { name: 'Quản lí đơn hàng', href: '/cms/orders', icon: FaShoppingCart },
  { name: 'Quản lí danh mục', href: '/cms/categories', icon: FaList },
  { name: 'Quản lí kho', href: '/cms/inventories', icon: FaWarehouse },
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
              'flex h-[48px] items-center gap-3 rounded-md p-3 text-base font-medium hover:bg-gray-100 text-primary',
              { 'bg-gray-200 ': pathname === link.href }
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
