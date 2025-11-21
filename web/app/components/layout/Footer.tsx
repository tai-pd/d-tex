import Link from 'next/link';
import { CONTACT_INFO, BRANDS } from '@/app/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">DTech Vietnam</h3>
            <p className="mb-4 text-sm">
              {CONTACT_INFO.address}
            </p>
            <p className="mb-4 text-sm">
              10 năm kinh nghiệm cung cấp thiết bị điện công nghiệp chính hãng uy tín.
            </p>
            <div className="flex gap-4">
              <a
                href={CONTACT_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={CONTACT_INFO.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
                aria-label="Zalo"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.5 18.5h-1v-7h1v7zm-.5-8.5a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Liên kết</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/posts" className="hover:text-white transition-colors">
                  Bài viết
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Thương hiệu</h3>
            <ul className="space-y-2 text-sm">
              {BRANDS.slice(0, 6).map((brand) => (
                <li key={brand}>
                  <span className="hover:text-white transition-colors cursor-default">
                    {brand}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <strong>Hotline:</strong>
                <br />
                <a href={`tel:${CONTACT_INFO.hotline}`} className="hover:text-white transition-colors">
                  {CONTACT_INFO.hotline}
                </a>
              </li>
              <li>
                <strong>Email:</strong>
                <br />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
              {CONTACT_INFO.salesTeam.slice(0, 2).map((member) => (
                <li key={member.email}>
                  <strong>{member.name}:</strong>
                  <br />
                  <a href={`tel:${member.phone}`} className="hover:text-white transition-colors">
                    {member.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center text-sm">
            <p>© {currentYear} DTech Vietnam. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
