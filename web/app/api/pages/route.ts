import { NextRequest, NextResponse } from 'next/server';
import { MOCK_PAGES_RESPONSE } from '@/app/lib/mock-data';
import { useMockData } from '@/app/lib/env';
import { payloadAPI } from '@/app/lib/api-client';

/**
 * GET /api/pages
 * Fetch pages
 * Uses mock data in development, real API in production
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');

  // Use mock data in development
  if (useMockData()) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return NextResponse.json(MOCK_PAGES_RESPONSE, { status: 200 });
  }

  // Production mode - use real API
  try {
    const data = slug 
      ? await payloadAPI.pages.getBySlug(slug)
      : await payloadAPI.pages.getAll();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(MOCK_PAGES_RESPONSE, { status: 200 });
  }
}
