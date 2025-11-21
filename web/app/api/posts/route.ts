import { NextRequest, NextResponse } from 'next/server';
import { MOCK_POSTS_RESPONSE } from '@/app/lib/mock-data';
import { useMockData } from '@/app/lib/env';
import { payloadAPI } from '@/app/lib/api-client';

/**
 * GET /api/posts
 * Fetch published posts
 * Uses mock data in development, real API in production
 */
export async function GET(request: NextRequest) {
  // Check if we should use mock data
  if (useMockData()) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const limit = parseInt(searchParams.get('limit') || '10');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let posts = [...MOCK_POSTS_RESPONSE.docs];
      
      // Apply limit
      posts = posts.slice(0, limit);
      
      return NextResponse.json({
        ...MOCK_POSTS_RESPONSE,
        docs: posts,
        totalDocs: posts.length,
      }, { status: 200 });
    } catch (error) {
      return NextResponse.json({
        docs: [],
        totalDocs: 0,
        limit: 10,
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
    const params: Record<string, any> = {
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
    };

    const page = searchParams.get('page');
    if (page) params.page = parseInt(page);

    const limit = searchParams.get('limit');
    if (limit) params.limit = parseInt(limit);

    const data = await payloadAPI.posts.getAll(params);
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      docs: [],
      totalDocs: 0,
      limit: 10,
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
 * POST /api/posts
 * Create a new post
 */
export async function POST(request: NextRequest) {
  if (useMockData()) {
    return NextResponse.json({
      message: 'Post creation not available in mock mode',
    }, { status: 200 });
  }

  try {
    const body = await request.json();
    const data = await payloadAPI.posts.create(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({
      message: 'Failed to create post',
    }, { status: 500 });
  }
}
