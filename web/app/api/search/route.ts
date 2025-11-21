import { NextRequest, NextResponse } from 'next/server';
import { MOCK_PRODUCTS_RESPONSE, MOCK_CATEGORIES_RESPONSE, MOCK_POSTS_RESPONSE } from '@/app/lib/mock-data';
import { useMockData } from '@/app/lib/env';
import { payloadAPI } from '@/app/lib/api-client';
import type { SearchResults } from '@/app/types';

/**
 * GET /api/search
 * Global search across products, categories, and posts
 * Uses mock data in development, real API in production
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Determine which collections to search
    const collections = searchParams.get('collections')?.split(',') || [
      'products',
      'categories',
      'posts',
    ];

    const limit = Number(searchParams.get('limit')) || 10;

    // Use mock data in development
    if (useMockData()) {
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Build search results from mock data
    const searchResults: any = {};
    const queryLower = query.toLowerCase();

    // Search products
    if (collections.includes('products')) {
      searchResults.products = MOCK_PRODUCTS_RESPONSE.docs.filter(product => 
        product.name.toLowerCase().includes(queryLower) ||
        product.description?.toLowerCase().includes(queryLower) ||
        product.code?.toLowerCase().includes(queryLower)
      ).slice(0, limit);
    }

    // Search categories
    if (collections.includes('categories')) {
      searchResults.categories = MOCK_CATEGORIES_RESPONSE.docs.filter(category =>
        category.name.toLowerCase().includes(queryLower) ||
        category.description?.toLowerCase().includes(queryLower)
      ).slice(0, limit);
    }

    // Search posts
    if (collections.includes('posts')) {
      searchResults.posts = MOCK_POSTS_RESPONSE.docs.filter(post =>
        post.title.toLowerCase().includes(queryLower) ||
        post.excerpt?.toLowerCase().includes(queryLower)
      ).slice(0, limit);
    }

    // Calculate total results
    const totalResults = Object.values(searchResults).reduce(
      (sum: number, docs: any) => sum + docs.length,
      0
    );

    return NextResponse.json(
      {
        query,
        results: searchResults,
        totalResults,
      },
      { status: 200 }
    );
    }

    // Production mode - use real API
    const searchPromises: Promise<any>[] = [];
    const searchCollections: string[] = [];

    if (collections.includes('products')) {
      searchCollections.push('products');
      searchPromises.push(
        payloadAPI.products.getAll({
          limit,
          where: {
            or: [
              { name: { contains: query } },
              { code: { contains: query } },
              { description: { contains: query } },
            ],
            status: { equals: 'published' },
          },
        })
      );
    }

    if (collections.includes('categories')) {
      searchCollections.push('categories');
      searchPromises.push(
        payloadAPI.categories.getAll({
          limit,
          where: {
            or: [
              { name: { contains: query } },
              { description: { contains: query } },
            ],
          },
        })
      );
    }

    if (collections.includes('posts')) {
      searchCollections.push('posts');
      searchPromises.push(
        payloadAPI.posts.getAll({
          limit,
          where: {
            or: [
              { title: { contains: query } },
              { excerpt: { contains: query } },
            ],
            status: { equals: 'published' },
          },
        })
      );
    }

    const results = await Promise.allSettled(searchPromises);
    const apiSearchResults: any = {};
    
    results.forEach((result, index) => {
      const collectionName = searchCollections[index];
      if (result.status === 'fulfilled') {
        apiSearchResults[collectionName] = result.value.docs || [];
      } else {
        apiSearchResults[collectionName] = [];
      }
    });

    const apiTotalResults = Object.values(apiSearchResults).reduce(
      (sum: number, docs: any) => sum + docs.length,
      0
    );

    return NextResponse.json(
      {
        query,
        results: apiSearchResults,
        totalResults: apiTotalResults,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Search failed',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
