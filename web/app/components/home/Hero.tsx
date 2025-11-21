import Button from '@/app/components/ui/Button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Thiết Bị Điện Công Nghiệp Chính Hãng
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-blue-100">
            Công ty Cổ phần Kỹ thuật Dtech
          </p>
          <p className="text-lg mb-8 text-blue-50">
            10 năm kinh nghiệm cung cấp thiết bị điện công nghiệp chính hãng uy tín:
            LS, Mitsubishi, Schneider, ABB, Siemens, Fuji, Samwha, Idec, Omron,...
          </p>
          <p className="text-lg mb-8 font-semibold">
            Hơn 10.000 nhà máy, doanh nghiệp đã tin tưởng sử dụng sản phẩm, dịch vụ của chúng tôi
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products">
              <Button size="lg" className="shadow-lg">
                Xem sản phẩm
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50 border-white">
                Liên hệ ngay
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
