import { NextRequest, NextResponse } from 'next/server';
import { MOCK_CATEGORIES_RESPONSE, MOCK_CATEGORIES } from '@/app/lib/mock-data';
import { useMockData } from '@/app/lib/env';
import { payloadAPI } from '@/app/lib/api-client';
import type { Category } from '@/app/types';

/**
 * GET /api/categories
 * Fetch all categories with optional filtering
 * Supports query params: slug, parent, limit
 * Uses mock data in development, real API in production
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('where[slug][equals]');
  const parent = searchParams.get('where[parent][equals]');
  const limit = searchParams.get('limit');

  // Use mock data in development
  if (useMockData()) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    let filteredCategories: Category[] = MOCK_CATEGORIES;

    // Filter by slug
    if (slug) {
      filteredCategories = filteredCategories.filter(cat => cat.slug === slug);
    }

    // Filter by parent
    if (parent) {
      filteredCategories = filteredCategories.filter(cat => cat.parent === parent);
    }

    // Apply limit
    if (limit) {
      filteredCategories = filteredCategories.slice(0, Number(limit));
    }

    const response = {
      docs: filteredCategories,
      hasNextPage: false,
      hasPrevPage: false,
      limit: Number(limit) || 100,
      nextPage: null,
      page: 1,
      pagingCounter: 1,
      prevPage: null,
      totalDocs: filteredCategories.length,
      totalPages: 1,
    };

    return NextResponse.json(response, { status: 200 });
  }

  // Production mode - use real API
  try {
    const params: Record<string, any> = {};
    if (slug) params.where = { ...params.where, slug: { equals: slug } };
    if (parent) params.where = { ...params.where, parent: { equals: parent } };
    if (limit) params.limit = Number(limit);

    const data = await payloadAPI.categories.getAll(params);
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    // Fallback to mock data on error
    return NextResponse.json(MOCK_CATEGORIES_RESPONSE, { status: 200 });
  }
}
