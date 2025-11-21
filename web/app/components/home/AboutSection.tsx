import Button from '@/app/components/ui/Button';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Công ty Cổ phần Kỹ thuật Dtech</h2>
            <p className="text-xl text-blue-600 font-semibold">
              10 năm kinh nghiệm - Uy tín & Chuyên nghiệp
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              DTech tự hào là đơn vị cung cấp thiết bị điện công nghiệp chính hãng, uy tín hàng đầu tại Việt Nam.
              Với đội ngũ kỹ thuật giàu kinh nghiệm và mạng lưới đối tác rộng khắp, chúng tôi cam kết mang đến
              cho khách hàng những sản phẩm chất lượng cao với giá cả cạnh tranh nhất.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-bold text-lg mb-2">Sản phẩm chính hãng 100%</h3>
                <p className="text-gray-600">
                  Cam kết cung cấp sản phẩm chính hãng từ các nhà sản xuất uy tín
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-bold text-lg mb-2">Hỗ trợ kỹ thuật 24/7</h3>
                <p className="text-gray-600">
                  Đội ngũ kỹ sư sẵn sàng hỗ trợ và tư vấn mọi lúc
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-bold text-lg mb-2">Giao hàng toàn quốc</h3>
                <p className="text-gray-600">
                  Vận chuyển nhanh chóng, an toàn đến tay khách hàng
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-bold text-lg mb-2">Bảo hành uy tín</h3>
                <p className="text-gray-600">
                  Chính sách bảo hành rõ ràng, hậu mãi tận tâm
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link href="/about">
                <Button size="lg" variant="outline">
                  Tìm hiểu thêm về chúng tôi
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
            <p className="text-2xl font-bold mb-4">
              Hơn 10.000 nhà máy, doanh nghiệp đã tin tưởng
            </p>
            <p className="text-lg mb-6">
              Hãy để chúng tôi trở thành đối tác tin cậy của bạn
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Liên hệ tư vấn
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
