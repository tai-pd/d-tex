/**
 * Environment configuration utilities
 */

/**
 * Check if we're in production mode (using real API)
 * Returns true if PRODUCTION env var is explicitly set to "true"
 * Returns false for development (using mock data)
 */
export function isProduction(): boolean {
  return process.env.PRODUCTION === 'true';
}

/**
 * Check if we should use mock data
 * Returns true in development or when PRODUCTION is not set to "true"
 */
export function useMockData(): boolean {
  return !isProduction();
}

/**
 * Get Payload CMS API URL
 * Only relevant when in production mode
 */
export function getPayloadURL(): string {
  return process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001/api';
}
