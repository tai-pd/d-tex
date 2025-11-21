'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Category } from '@/app/types';

interface SidebarItemProps {
  category: Category;
}

export default function SidebarItem({ category }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname.includes(category.slug);

  return (
    <Link
      href={`/${category.slug}`}
      className={`
        block px-6 py-2.5 text-sm border-b border-gray-100 
        transition-colors duration-150
        ${
          isActive
            ? 'text-blue-600 font-semibold bg-blue-50'
            : 'text-blue-600 hover:bg-gray-50 hover:underline'
        }
      `}
    >
      {category.name}
    </Link>
  );
}
