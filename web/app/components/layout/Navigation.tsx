'use client';

import Link from 'next/link';

interface NavigationProps {
  isMenuOpen?: boolean;
}

const navigationItems = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Sản phẩm', href: '/products' },
  { label: 'Bài viết', href: '/posts' },
  { label: 'Về chúng tôi', href: '/about' },
  { label: 'Liên hệ', href: '/contact' },
];

export default function Navigation({ isMenuOpen = false }: NavigationProps) {
  return (
    <nav className={`
      bg-gray-50 border-t border-gray-200
      ${isMenuOpen ? 'block' : 'hidden md:block'}
    `}>
      <div className="container mx-auto px-4">
        <ul className="flex flex-col md:flex-row md:items-center md:gap-8 py-2">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block py-3 md:py-2 px-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
