'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Category } from '@/app/types';
import { fetchJSON } from '@/app/lib/fetch-client';

interface CategoryGridProps {
  parentSlug: string;
  description?: string;
}

export default function CategoryGrid({ parentSlug, description }: CategoryGridProps) {
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        // Fetch all categories and filter by parent slug
        const data = await fetchJSON<{ docs: Category[] }>('/api/categories?limit=100');
        
        // Find parent category
        const parent = data.docs.find(cat => cat.slug === parentSlug);
        
        if (parent) {
          // Filter subcategories where parent matches
          const children = data.docs.filter(cat => {
            if (typeof cat.parent === 'string') {
              return cat.parent === parent.id;
            } else if (cat.parent && typeof cat.parent === 'object') {
              return cat.parent.id === parent.id;
            }
            return false;
          });
          setSubcategories(children);
        }
      } catch (error) {
        console.error('Failed to fetch subcategories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [parentSlug]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-6 animate-pulse">
            <div className="aspect-square bg-gray-200 rounded mb-4" />
            <div className="h-6 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Description */}
      {description && (
        <div className="mb-8">
          <p className="text-lg text-gray-700">{description}</p>
        </div>
      )}

      {/* Subcategories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subcategories.map((category) => {
          const imageUrl = category.image
            ? (typeof category.image === 'object' && category.image?.url
              ? category.image.url
              : '/placeholder-category.jpg')
            : '/placeholder-category.jpg';

          return (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all group"
            >
              {/* Category Image */}
              <div className="relative aspect-square mb-4 bg-gray-100 rounded overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={category.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Category Name */}
              <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>

              {/* Category Description */}
              {category.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {category.description}
                </p>
              )}
            </Link>
          );
        })}
      </div>

      {/* Empty State */}
      {subcategories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Chưa có danh mục sản phẩm nào</p>
        </div>
      )}
    </div>
  );
}
