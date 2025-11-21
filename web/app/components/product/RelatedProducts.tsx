'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/app/components/category/ProductCard';
import type { Product } from '@/app/types';
import { fetchJSON } from '@/app/lib/fetch-client';

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

export default function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!categoryId) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchJSON<{ docs: Product[] }>(`/api/products?category=${categoryId}&limit=4`);
        // Filter out current product
        const filtered = (data.docs || []).filter((p: Product) => p.id !== currentProductId);
        setProducts(filtered.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch related products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [categoryId, currentProductId]);

  if (loading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
