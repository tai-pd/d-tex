# API Routes Documentation

## Overview

This document describes the API routes for the DTech website, which integrate with Payload CMS using Axios for HTTP requests.

## Base Configuration

**API Base URL**: Configured via `NEXT_PUBLIC_PAYLOAD_URL` environment variable
**Default**: `http://localhost:3000/api`

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Payload CMS Configuration
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000/api
PAYLOAD_API_KEY=your-api-key-here

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

---

## API Endpoints

### 1. Categories API

**Endpoint**: `/api/categories`

#### GET - Fetch Categories

Retrieve all categories with optional filtering and pagination.

**Query Parameters**:

- `limit` (number): Number of items per page (default: 100)
- `page` (number): Page number (default: 1)
- `sort` (string): Sort field (default: 'name')
- `parent` (string): Filter by parent category ID

**Example Request**:

```javascript
// Fetch all categories
const response = await fetch("/api/categories");

// Fetch categories with pagination
const response = await fetch("/api/categories?limit=20&page=1&sort=name");

// Fetch child categories
const response = await fetch("/api/categories?parent=category-id");
```

**Response**:

```json
{
  "docs": [
    {
      "id": "...",
      "name": "Thiết bị điện LS",
      "slug": "thiet-bi-dien-ls-sp",
      "description": "...",
      "image": {...},
      "parent": null,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "totalDocs": 10,
  "limit": 100,
  "totalPages": 1,
  "page": 1,
  "hasNextPage": false,
  "hasPrevPage": false
}
```

#### POST - Create Category

Create a new category (admin only).

**Request Body**:

```json
{
  "name": "New Category",
  "slug": "new-category",
  "description": "Category description",
  "parent": "parent-category-id"
}
```

---

### 2. Products API

**Endpoint**: `/api/products`

#### GET - Fetch Products

Retrieve all products with filtering, search, and pagination.

**Query Parameters**:

- `limit` (number): Number of items per page (default: 12)
- `page` (number): Page number (default: 1)
- `sort` (string): Sort field (default: '-createdAt')
- `category` (string): Filter by category ID
- `brand` (string): Filter by brand ID
- `featured` (boolean): Filter featured products
- `status` (string): Filter by status ('draft' or 'published', default: 'published')
- `search` (string): Search by name, code, or description

**Example Requests**:

```javascript
// Fetch all published products
const response = await fetch("/api/products");

// Fetch products by category
const response = await fetch(
  "/api/products?category=category-id&limit=12&page=1"
);

// Search products
const response = await fetch("/api/products?search=mccb");

// Fetch featured products
const response = await fetch("/api/products?featured=true&limit=6");

// Fetch products by brand
const response = await fetch("/api/products?brand=brand-id");
```

**Response**:

```json
{
  "docs": [
    {
      "id": "...",
      "name": "MCCB LS - Aptomat khối LS",
      "slug": "mccb-ls-aptomat-khoi-ls-p",
      "code": "MCCB-LS-01",
      "description": "...",
      "category": {...},
      "brand": {...},
      "images": [...],
      "specifications": [...],
      "price": 1000000,
      "featured": false,
      "status": "published",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "totalDocs": 50,
  "limit": 12,
  "totalPages": 5,
  "page": 1
}
```

#### POST - Create Product

Create a new product (admin only).

**Request Body**:

```json
{
  "name": "Product Name",
  "slug": "product-slug",
  "code": "PROD-001",
  "description": "Product description",
  "category": "category-id",
  "brand": "brand-id",
  "price": 1000000,
  "specifications": [
    { "key": "Voltage", "value": "220V" },
    { "key": "Current", "value": "100A" }
  ],
  "featured": false,
  "status": "published"
}
```

---

### 3. Posts API

**Endpoint**: `/api/posts`

#### GET - Fetch Posts

Retrieve all blog posts/articles with filtering and pagination.

**Query Parameters**:

- `limit` (number): Number of items per page (default: 10)
- `page` (number): Page number (default: 1)
- `sort` (string): Sort field (default: '-publishedAt')
- `status` (string): Filter by status ('draft' or 'published', default: 'published')
- `search` (string): Search by title or excerpt

**Example Requests**:

```javascript
// Fetch all published posts
const response = await fetch("/api/posts");

// Fetch posts with pagination
const response = await fetch("/api/posts?limit=10&page=1");

// Search posts
const response = await fetch("/api/posts?search=automation");
```

**Response**:

```json
{
  "docs": [
    {
      "id": "...",
      "title": "Post Title",
      "slug": "post-slug",
      "excerpt": "Short description...",
      "content": {...},
      "featuredImage": {...},
      "author": "Admin",
      "publishedAt": "...",
      "status": "published",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "totalDocs": 20,
  "limit": 10,
  "totalPages": 2,
  "page": 1
}
```

#### POST - Create Post

Create a new post (admin only).

**Request Body**:

```json
{
  "title": "Post Title",
  "slug": "post-slug",
  "excerpt": "Short description",
  "content": {...},
  "author": "Admin",
  "publishedAt": "2025-11-21T00:00:00.000Z",
  "status": "published"
}
```

---

### 4. Search API

**Endpoint**: `/api/search`

#### GET - Global Search

Search across products, categories, and posts.

**Query Parameters**:

- `q` (string, required): Search query
- `limit` (number): Max results per collection (default: 10)
- `collections` (string): Comma-separated list of collections (default: 'products,categories,posts')

**Example Requests**:

```javascript
// Search all collections
const response = await fetch("/api/search?q=ls");

// Search only products
const response = await fetch("/api/search?q=mccb&collections=products");

// Search with custom limit
const response = await fetch("/api/search?q=automation&limit=20");
```

**Response**:

```json
{
  "query": "ls",
  "results": {
    "products": [...],
    "categories": [...],
    "posts": [...]
  },
  "totalResults": 25
}
```

---

## Using the API Client

### Server-Side Usage (API Routes, Server Components)

```typescript
import { payloadAPI } from "@/app/lib/api-client";

// Fetch all categories
const categories = await payloadAPI.categories.getAll();

// Fetch products by category
const products = await payloadAPI.products.getByCategory("category-id", {
  limit: 12,
  page: 1,
});

// Search
const searchResults = await payloadAPI.search("mccb");
```

### Client-Side Usage (Client Components, Hooks)

```typescript
import { useEffect, useState } from "react";

export function useProducts(categoryId?: string) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const params = new URLSearchParams();
      if (categoryId) params.set("category", categoryId);

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();

      setProducts(data.docs);
      setLoading(false);
    };

    fetchProducts();
  }, [categoryId]);

  return { products, loading };
}
```

---

## Error Handling

All API routes return consistent error responses:

```json
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

**HTTP Status Codes**:

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error

---

## Authentication

For admin operations (POST, PUT, DELETE), authentication is required. Implement authentication middleware:

```typescript
// Example middleware (not implemented yet)
const session = await getSession(request);
if (!session || !session.user.isAdmin) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

---

## Rate Limiting

Consider implementing rate limiting for production:

```typescript
// Example: Use next-rate-limit or similar package
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
```

---

## Testing the API

Use the following tools to test the API:

### Using cURL

```bash
# Fetch categories
curl http://localhost:3001/api/categories

# Search products
curl "http://localhost:3001/api/search?q=mccb"

# Fetch products by category
curl "http://localhost:3001/api/products?category=category-id&limit=12"
```

### Using Thunder Client / Postman

1. Import the collection
2. Set base URL: `http://localhost:3001/api`
3. Test each endpoint

---

## Next Steps

1. ✅ API routes implemented
2. ✅ Type definitions created
3. ✅ API client with axios configured
4. ⏳ Implement authentication middleware
5. ⏳ Add rate limiting
6. ⏳ Create React hooks for client-side data fetching
7. ⏳ Add error boundaries and loading states
8. ⏳ Write unit tests for API routes
