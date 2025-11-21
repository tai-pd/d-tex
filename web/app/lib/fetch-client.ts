/**
 * Custom fetch wrapper with retry limit
 * Use this instead of native fetch() for client-side API calls
 */

interface FetchWithRetryOptions extends RequestInit {
  maxRetries?: number;
  retryDelay?: number;
}

/**
 * Fetch with retry logic - maximum 3 attempts
 */
export async function fetchWithRetry(
  url: string,
  options: FetchWithRetryOptions = {}
): Promise<Response> {
  const {
    maxRetries = 1, // Only 1 retry to avoid spam
    retryDelay = 1000,
    ...fetchOptions
  } = options;

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Don't retry on client errors (4xx) except 408 and 429
      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          if (response.status !== 408 && response.status !== 429) {
            return response; // Return error response without retry
          }
        }
      } else {
        return response; // Success
      }

      // For 5xx errors or specific 4xx, continue to retry
      if (attempt < maxRetries) {
        const delay = retryDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        return response; // Return last response even if error
      }
    } catch (error: any) {
      lastError = error;

      // If this is the last attempt, throw the error silently
      if (attempt === maxRetries) {
        throw error;
      }

      // Wait before retrying
      const delay = retryDelay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error('Request failed after maximum retries');
}

/**
 * Helper function for JSON API calls
 */
export async function fetchJSON<T = any>(
  url: string,
  options: FetchWithRetryOptions = {}
): Promise<T> {
  const response = await fetchWithRetry(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}
