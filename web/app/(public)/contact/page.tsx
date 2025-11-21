import { Metadata } from 'next';
import Breadcrumb from '@/app/components/layout/Breadcrumb';
import { CONTACT_INFO } from '@/app/lib/constants';

export const metadata: Metadata = {
  title: 'Liên hệ - DTech Vietnam',
  description: 'Liên hệ với chúng tôi để được tư vấn và hỗ trợ',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Liên hệ', href: '/contact' },
        ]}
      />

      <h1 className="text-4xl font-bold mb-8">Liên hệ</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Thông tin liên hệ</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Hotline</h3>
              <a href={`tel:${CONTACT_INFO.hotline}`} className="text-blue-600 hover:underline">
                {CONTACT_INFO.hotline}
              </a>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Email</h3>
              <a href={`mailto:${CONTACT_INFO.email}`} className="text-blue-600 hover:underline">
                {CONTACT_INFO.email}
              </a>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Địa chỉ</h3>
              <p>{CONTACT_INFO.address}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Đội ngũ kinh doanh</h3>
              <div className="space-y-3">
                {CONTACT_INFO.salesTeam.map((member) => (
                  <div key={member.email} className="border-l-4 border-blue-500 pl-4">
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm">
                      <a href={`tel:${member.phone}`} className="text-blue-600 hover:underline">
                        {member.phone}
                      </a>
                    </p>
                    <p className="text-sm">
                      <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                        {member.email}
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Gửi tin nhắn</h2>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium mb-2">
                Họ và tên *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block font-medium mb-2">
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="company" className="block font-medium mb-2">
                Công ty
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-medium mb-2">
                Nội dung *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Gửi tin nhắn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
