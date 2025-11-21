import { NextRequest, NextResponse } from 'next/server';
import { MOCK_PRODUCTS_RESPONSE } from '@/app/lib/mock-data';
import { useMockData } from '@/app/lib/env';
import { payloadAPI } from '@/app/lib/api-client';

/**
 * GET /api/products
 * Fetch products with optional filtering
 * Uses mock data in development, real API in production
 */
export async function GET(request: NextRequest) {
  // Check if we should use mock data
  if (useMockData()) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const featured = searchParams.get('featured');
      const limit = parseInt(searchParams.get('limit') || '12');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let products = [...MOCK_PRODUCTS_RESPONSE.docs];
      
      // Filter featured if requested
      if (featured === 'true') {
        products = products.filter(p => p.featured === true);
      }
      
      // Apply limit
      products = products.slice(0, limit);
      
      return NextResponse.json({
        ...MOCK_PRODUCTS_RESPONSE,
        docs: products,
        totalDocs: products.length,
      }, { status: 200 });
    } catch (error) {
      return NextResponse.json({
        docs: [],
        totalDocs: 0,
        limit: 12,
        totalPages: 0,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
      }, { status: 200 });
    }
  }

  // Production mode - use real API
  try {
    const searchParams = request.nextUrl.searchParams;
    const params: Record<string, any> = {};

    // Pagination
    const page = searchParams.get('page');
    if (page) params.page = parseInt(page);

    const limit = searchParams.get('limit');
    if (limit) params.limit = parseInt(limit);

    // Filtering
    const featured = searchParams.get('featured');
    if (featured) {
      params.where = params.where || {};
      params.where.featured = { equals: featured === 'true' };
    }

    const category = searchParams.get('category');
    if (category) {
      params.where = params.where || {};
      params.where['category.slug'] = { equals: category };
    }

    const data = await payloadAPI.products.getAll(params);
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      docs: [],
      totalDocs: 0,
      limit: 12,
      totalPages: 0,
      page: 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    }, { status: 200 });
  }
}

/**
 * POST /api/products
 * Create a new product
 */
export async function POST(request: NextRequest) {
  if (useMockData()) {
    return NextResponse.json({
      message: 'Product creation not available in mock mode',
    }, { status: 200 });
  }

  try {
    const body = await request.json();
    const data = await payloadAPI.products.create(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({
      message: 'Failed to create product',
    }, { status: 500 });
  }
}
