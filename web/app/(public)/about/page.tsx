import { Metadata } from 'next';
import Breadcrumb from '@/app/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Về chúng tôi - DTech Vietnam',
  description: 'Công ty Cổ phần Kỹ thuật Dtech - 10 năm kinh nghiệm cung cấp thiết bị điện công nghiệp',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Về chúng tôi', href: '/about' },
        ]}
      />

      <h1 className="text-4xl font-bold mb-8">Về chúng tôi</h1>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mb-4">Công ty Cổ phần Kỹ thuật Dtech</h2>
        
        <p className="mb-6">
          Với hơn 10 năm kinh nghiệm trong lĩnh vực cung cấp thiết bị điện công nghiệp,
          DTech tự hào là đối tác tin cậy của hơn 10.000 nhà máy và doanh nghiệp trên toàn quốc.
        </p>

        <h3 className="text-xl font-semibold mb-3">Sản phẩm & Dịch vụ</h3>
        <p className="mb-6">
          Chúng tôi chuyên cung cấp thiết bị điện công nghiệp chính hãng từ các thương hiệu hàng đầu:
          LS, Mitsubishi, Schneider, ABB, Siemens, Fuji, Samwha, Idec, Omron,...
        </p>

        <h3 className="text-xl font-semibold mb-3">Cam kết của chúng tôi</h3>
        <ul className="list-disc pl-6 mb-6">
          <li>Sản phẩm chính hãng 100%</li>
          <li>Giá cả cạnh tranh</li>
          <li>Hỗ trợ kỹ thuật chuyên nghiệp</li>
          <li>Giao hàng nhanh chóng</li>
          <li>Bảo hành uy tín</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Liên hệ</h3>
        <p className="mb-2">
          <strong>Hotline:</strong> <a href="tel:0904592583" className="text-blue-600">0904 592 583</a>
        </p>
        <p className="mb-2">
          <strong>Email:</strong> <a href="mailto:sales@dtech.vn" className="text-blue-600">sales@dtech.vn</a>
        </p>
      </div>
    </div>
  );
}
