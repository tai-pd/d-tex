import Link from 'next/link';
import Image from 'next/image';
import Card from '@/app/components/ui/Card';
import type { Product } from '@/app/types';
import { formatCurrency } from '@/app/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images && product.images.length > 0
    ? (typeof product.images[0] === 'object' && product.images[0]?.url
      ? product.images[0].url
      : '/placeholder-product.jpg')
    : '/placeholder-product.jpg';

  const categorySlug = typeof product.category === 'object'
    ? product.category?.slug
    : 'products';

  return (
    <Link href={`/${categorySlug}/${product.slug}`}>
      <Card hover className="h-full group">
        <div className="p-4">
          {/* Image */}
          <div className="relative aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            {product.featured && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                Nổi bật
              </div>
            )}
          </div>

          {/* Brand */}
          {product.brand && (
            <div className="text-sm text-blue-600 font-semibold mb-1">
              {typeof product.brand === 'object' ? product.brand.name : product.brand}
            </div>
          )}

          {/* Name */}
          <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Code */}
          {product.code && (
            <p className="text-sm text-gray-500 mb-2">Mã: {product.code}</p>
          )}

          {/* Price */}
          {product.price && product.price > 0 ? (
            <p className="text-lg font-bold text-blue-600">
              {formatCurrency(product.price)}
            </p>
          ) : (
            <p className="text-sm text-gray-500 italic">Liên hệ</p>
          )}
        </div>
      </Card>
    </Link>
  );
}
