import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

/**
 * Payload CMS API Client Configuration
 */
const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000/api';

/**
 * Create axios instance with default configuration
 */
export const payloadClient: AxiosInstance = axios.create({
  baseURL: PAYLOAD_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

/**
 * Request interceptor to add authentication token
 */
payloadClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = process.env.PAYLOAD_API_KEY;
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for error handling
 */
payloadClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error:', error.message);
    } else {
      // Error in request setup
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Generic API request function with retry logic
 */
export async function apiRequest<T>(
  endpoint: string,
  options?: AxiosRequestConfig
): Promise<T> {
  const MAX_RETRIES = 1; // Only 1 retry to avoid spam
  const RETRY_DELAY = 1000; // 1 second
  
  let lastError: any;
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await payloadClient.request<T>({
        url: endpoint,
        ...options,
      });
      return response.data;
    } catch (error: any) {
      lastError = error;
      
      // Don't retry on client errors (4xx) except 408 (timeout) and 429 (rate limit)
      if (error.response?.status && error.response.status >= 400 && error.response.status < 500) {
        if (error.response.status !== 408 && error.response.status !== 429) {
          throw error;
        }
      }
      
      // If this is the last attempt, throw the error silently
      if (attempt === MAX_RETRIES) {
        throw error;
      }
      
      // Wait before retrying (no console spam)
      const delay = RETRY_DELAY * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}

/**
 * API Helper Functions
 */

export const api = {
  /**
   * GET request
   */
  get: async <T>(endpoint: string, params?: Record<string, any>): Promise<T> => {
    return apiRequest<T>(endpoint, { method: 'GET', params });
  },

  /**
   * POST request
   */
  post: async <T>(endpoint: string, data?: any): Promise<T> => {
    return apiRequest<T>(endpoint, { method: 'POST', data });
  },

  /**
   * PUT request
   */
  put: async <T>(endpoint: string, data?: any): Promise<T> => {
    return apiRequest<T>(endpoint, { method: 'PUT', data });
  },

  /**
   * DELETE request
   */
  delete: async <T>(endpoint: string): Promise<T> => {
    return apiRequest<T>(endpoint, { method: 'DELETE' });
  },
};

/**
 * Payload CMS specific API endpoints
 */
export const payloadAPI = {
  // Categories
  categories: {
    getAll: (params?: Record<string, any>) => api.get('/categories', params),
    getById: (id: string) => api.get(`/categories/${id}`),
    getBySlug: (slug: string) => api.get(`/categories`, { where: { slug: { equals: slug } } }),
    create: (data: any) => api.post('/categories', data),
    update: (id: string, data: any) => api.put(`/categories/${id}`, data),
    delete: (id: string) => api.delete(`/categories/${id}`),
  },

  // Products
  products: {
    getAll: (params?: Record<string, any>) => api.get('/products', params),
    getById: (id: string) => api.get(`/products/${id}`),
    getBySlug: (slug: string) => api.get(`/products`, { where: { slug: { equals: slug } } }),
    getByCategory: (categoryId: string, params?: Record<string, any>) => 
      api.get('/products', { where: { category: { equals: categoryId } }, ...params }),
    create: (data: any) => api.post('/products', data),
    update: (id: string, data: any) => api.put(`/products/${id}`, data),
    delete: (id: string) => api.delete(`/products/${id}`),
  },

  // Posts
  posts: {
    getAll: (params?: Record<string, any>) => api.get('/posts', params),
    getById: (id: string) => api.get(`/posts/${id}`),
    getBySlug: (slug: string) => api.get(`/posts`, { where: { slug: { equals: slug } } }),
    create: (data: any) => api.post('/posts', data),
    update: (id: string, data: any) => api.put(`/posts/${id}`, data),
    delete: (id: string) => api.delete(`/posts/${id}`),
  },

  // Serials
  serials: {
    getAll: (params?: Record<string, any>) => api.get('/serials', params),
    getById: (id: string) => api.get(`/serials/${id}`),
    getBySlug: (slug: string) => api.get(`/serials`, { where: { slug: { equals: slug } } }),
  },

  // Brands
  brands: {
    getAll: (params?: Record<string, any>) => api.get('/brands', params),
    getById: (id: string) => api.get(`/brands/${id}`),
    create: (data: any) => api.post('/brands', data),
    update: (id: string, data: any) => api.put(`/brands/${id}`, data),
    delete: (id: string) => api.delete(`/brands/${id}`),
  },

  // Media
  media: {
    getAll: (params?: Record<string, any>) => api.get('/media', params),
    getById: (id: string) => api.get(`/media/${id}`),
    upload: (formData: FormData) => api.post('/media', formData),
    delete: (id: string) => api.delete(`/media/${id}`),
  },

  // Pages
  pages: {
    getAll: (params?: Record<string, any>) => api.get('/pages', params),
    getById: (id: string) => api.get(`/pages/${id}`),
    getBySlug: (slug: string) => api.get(`/pages`, { where: { slug: { equals: slug } } }),
    create: (data: any) => api.post('/pages', data),
    update: (id: string, data: any) => api.put(`/pages/${id}`, data),
    delete: (id: string) => api.delete(`/pages/${id}`),
  },

  // Search
  search: (query: string, collections: string[] = ['products', 'categories', 'posts']) => {
    const promises = collections.map(collection =>
      api.get(`/${collection}`, { 
        where: { 
          or: [
            { title: { contains: query } },
            { name: { contains: query } },
            { description: { contains: query } },
          ]
        }
      })
    );
    return Promise.all(promises);
  },
};
