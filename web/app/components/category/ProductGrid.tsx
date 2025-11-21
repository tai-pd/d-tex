'use client';

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import type { Product, PayloadResponse } from '@/app/types';
import { fetchJSON } from '@/app/lib/fetch-client';

interface ProductGridProps {
  categorySlug: string;
  page: number;
  sort: string;
}

export default function ProductGrid({ categorySlug, page, sort }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // TODO: Get category ID from slug first
        const data = await fetchJSON<PayloadResponse<Product>>(`/api/products?page=${page}&sort=${sort}`);
        setProducts(data.docs || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug, page, sort]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
            <div className="h-6 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Không có sản phẩm nào trong danh mục này</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, i) => (
            <a
              key={i}
              href={`?page=${i + 1}&sort=${sort}`}
              className={`px-4 py-2 rounded-lg ${
                i + 1 === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
