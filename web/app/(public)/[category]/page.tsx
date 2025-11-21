import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/app/components/layout/Breadcrumb';
import ProductGrid from '@/app/components/category/ProductGrid';
import CategoryGrid from '@/app/components/category/CategoryGrid';
import type { Category, PayloadResponse } from '@/app/types';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string; sort?: string }>;
}

async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/categories?where[slug][equals]=${slug}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch category');
    }

    const data: PayloadResponse<Category> = await response.json();
    return data.docs[0] || null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

async function checkHasChildren(categoryId: string): Promise<boolean> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/categories?where[parent][equals]=${categoryId}&limit=1`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      return false;
    }

    const data: PayloadResponse<Category> = await response.json();
    return data.totalDocs > 0;
  } catch (error) {
    console.error('Error checking for subcategories:', error);
    return false;
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const sort = resolvedSearchParams.sort || '-createdAt';

  // Fetch category data
  const categoryData = await fetchCategoryBySlug(category);
  
  if (!categoryData) {
    notFound();
  }

  // Check if this category has children (subcategories)
  const hasChildren = await checkHasChildren(categoryData.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: categoryData.name, href: `/${category}` },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6">{categoryData.name}</h1>

      <Suspense fallback={<div className="text-center py-12">Đang tải...</div>}>
        {hasChildren ? (
          // Parent category - show subcategories
          <CategoryGrid
            parentSlug={category}
            description={categoryData.description}
          />
        ) : (
          // Leaf category - show products
          <ProductGrid
            categorySlug={category}
            page={page}
            sort={sort}
          />
        )}
      </Suspense>
    </div>
  );
}
