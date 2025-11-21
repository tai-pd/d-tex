/**
 * General utility functions
 */

/**
 * Format currency to VND
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}

/**
 * Format date to Vietnamese locale
 */
export function formatDate(date: Date | string): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Ngày không hợp lệ';
    }
    
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj);
  } catch (error) {
    return 'Ngày không hợp lệ';
  }
}

/**
 * Generate slug from text
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

/**
 * Parse dtech.vn URL pattern
 * Examples:
 * - /thiet-bi-dien-ls-sp-c-119.html -> { type: 'category', slug: 'thiet-bi-dien-ls-sp', id: '119' }
 * - /mccb-ls-aptomat-khoi-ls-p-c-22.html -> { type: 'product', slug: 'mccb-ls-aptomat-khoi-ls-p', id: '22' }
 */
export function parseDtechURL(url: string): {
  type: 'category' | 'product' | null;
  slug: string;
  id: string;
} | null {
  // Remove leading slash and .html extension
  const cleanUrl = url.replace(/^\//, '').replace(/\.html$/, '');
  
  // Pattern: [slug]-sp-c-[id] for category
  const categoryMatch = cleanUrl.match(/^(.+)-sp-c-(\d+)$/);
  if (categoryMatch) {
    return {
      type: 'category',
      slug: categoryMatch[1],
      id: categoryMatch[2],
    };
  }
  
  // Pattern: [slug]-p-c-[id] for product
  const productMatch = cleanUrl.match(/^(.+)-p-c-(\d+)$/);
  if (productMatch) {
    return {
      type: 'product',
      slug: productMatch[1],
      id: productMatch[2],
    };
  }
  
  return null;
}

/**
 * Generate dtech.vn URL pattern
 */
export function generateDtechURL(
  type: 'category' | 'product',
  slug: string,
  id: string
): string {
  const suffix = type === 'category' ? 'sp-c' : 'p-c';
  return `/${slug}-${suffix}-${id}.html`;
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if value is empty
 */
export function isEmpty(value: any): boolean {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Class name helper (simple alternative to clsx)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
