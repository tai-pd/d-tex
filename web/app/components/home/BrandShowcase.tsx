import { BRANDS } from '@/app/lib/constants';

export default function BrandShowcase() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Thương hiệu chính hãng</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng tôi là đại lý chính thức của các thương hiệu thiết bị điện hàng đầu thế giới
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {BRANDS.map((brand) => (
            <div
              key={brand}
              className="flex items-center justify-center bg-white border border-gray-200 rounded-lg p-8 hover:shadow-md transition-shadow"
            >
              <span className="text-2xl font-bold text-gray-700">{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
