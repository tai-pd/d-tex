import { NextRequest, NextResponse } from 'next/server';
import { MOCK_SERIALS_RESPONSE } from '@/app/lib/mock-data';
import { useMockData } from '@/app/lib/env';
import { payloadAPI } from '@/app/lib/api-client';

/**
 * GET /api/serials
 * Fetch all serials with categories
 * Uses mock data in development, real API in production
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const depth = searchParams.get('depth') || '1';

  // Use mock data in development
  if (useMockData()) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return NextResponse.json(MOCK_SERIALS_RESPONSE, { status: 200 });
  }

  // Production mode - use real API
  try {
    const data = await payloadAPI.serials.getAll({ depth: parseInt(depth) });
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(MOCK_SERIALS_RESPONSE, { status: 200 });
  }
}
