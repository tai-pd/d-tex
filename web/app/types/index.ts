/**
 * TypeScript type definitions for API responses
 */

export interface PaginationMeta {
  docs: any[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface PayloadResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface Media {
  id: string;
  alt?: string;
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width?: number;
  height?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: Media | string;
  parent?: Category | string;
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: Media | string;
  description?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  code?: string;
  description?: string;
  content?: any; // Rich text content
  category?: Category | string;
  brand?: Brand | string;
  images?: (Media | string)[];
  specifications?: {
    key: string;
    value: string;
  }[];
  applications?: string[];
  price?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  catalog?: Media | string;
  priceList?: Media | string;
  featured?: boolean;
  status?: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: any; // Rich text content
  featuredImage?: Media | string;
  author?: string;
  publishedAt?: string;
  status?: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content?: any; // Rich text content
  status?: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status?: 'new' | 'contacted' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

export interface Serial {
  id: string;
  name: string;
  slug: string;
  description?: string;
  categories?: Category[] | string[];
  order?: number;
  createdAt: string;
  updatedAt: string;
}

// API Query Parameters
export interface QueryParams {
  limit?: number;
  page?: number;
  sort?: string;
  where?: Record<string, any>;
  depth?: number;
}

// Search Results
export interface SearchResults {
  products: Product[];
  categories: Category[];
  posts: Post[];
}
