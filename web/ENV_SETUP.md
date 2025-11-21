# Environment Variables Setup

This project uses environment variables to control whether to use **mock data** (for development) or **real API** (for production).

## Quick Setup

Create a file named `.env` in the root directory (`e:\Dev\0.Prjs\d-tex\web\.env`):

```env
# Set to "true" to use real API, "false" to use mock data
PRODUCTION=false

# Payload CMS API URL (only used when PRODUCTION=true)
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001/api
```

> **Note**: Next.js automatically loads `.env` files. You don't need the `dotenv` package.

## Configuration Options

### Development Mode (Mock Data) - Default

```env
PRODUCTION=false
```

- All APIs return mock data
- No backend required
- Perfect for frontend development and testing
- Simulated 200-300ms API delay

### Production Mode (Real API)

```env
PRODUCTION=true
NEXT_PUBLIC_PAYLOAD_URL=http://your-backend-url/api
```

- All APIs connect to real Payload CMS backend
- Requires backend server running
- Full CRUD operations available

## API Routes - All Support Production Mode ✅

The following 8 APIs respect the `PRODUCTION` environment variable:

| API Route         | Mock Data | Real API | Features                                 |
| ----------------- | --------- | -------- | ---------------------------------------- |
| `/api/products`   | ✅        | ✅       | Filter by featured, category, pagination |
| `/api/posts`      | ✅        | ✅       | Filter by status, pagination, sorting    |
| `/api/categories` | ✅        | ✅       | Full CRUD operations                     |
| `/api/brands`     | ✅        | ✅       | Full CRUD operations                     |
| `/api/serials`    | ✅        | ✅       | Support depth parameter                  |
| `/api/media`      | ✅        | ✅       | Upload & delete support                  |
| `/api/pages`      | ✅        | ✅       | Filter by slug                           |
| `/api/search`     | ✅        | ✅       | Search across collections                |

## How It Works

The `useMockData()` function in `app/lib/env.ts` checks the `PRODUCTION` environment variable:

```typescript
export function useMockData(): boolean {
  return process.env.PRODUCTION !== "true";
}
```

Each API route checks this before deciding which data source to use:

```typescript
if (useMockData()) {
  // Return mock data from app/lib/mock-data.ts
  return NextResponse.json(MOCK_DATA, { status: 200 });
} else {
  // Call real Payload CMS API
  const data = await payloadAPI.collection.getAll();
  return NextResponse.json(data, { status: 200 });
}
```

## Mock Data

All mock data is centralized in `app/lib/mock-data.ts`:

- **Products**: 5 detailed products with specs, images, pricing
- **Categories**: 22 categories across 3 serials
- **Brands**: 8 electrical equipment brands
- **Posts**: 3 blog articles
- **Pages**: 3 static pages
- **Serials**: 3 product collections
- **Media**: 5 sample images

## Switching Modes

1. **To use mock data** (default):

   - Set `PRODUCTION=false` in `.env`
   - Or omit the variable entirely

2. **To use real API**:

   - Set `PRODUCTION=true` in `.env`
   - Configure `NEXT_PUBLIC_PAYLOAD_URL`

3. **Restart the dev server** after changing `.env`:
   ```bash
   # Press Ctrl+C to stop
   pnpm dev
   ```

## Error Handling

All APIs have fallback to mock data even in production mode if the backend call fails:

```typescript
try {
  const data = await payloadAPI.collection.getAll();
  return NextResponse.json(data, { status: 200 });
} catch (error) {
  // Fallback to mock data
  return NextResponse.json(MOCK_DATA, { status: 200 });
}
```

This ensures the app always works, even when the backend is unavailable.

## Notes

- `.env` file is gitignored (not committed to repository)
- Environment variables are loaded at build time in Next.js
- Always restart dev server after changing `.env`
- The `dotenv` package is not needed (Next.js handles it)
