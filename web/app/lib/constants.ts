/**
 * Application constants
 */

export const APP_CONFIG = {
  name: 'DTech Vietnam',
  description: 'Điện Công Nghiệp | Tủ Điện | Tự Động Hóa',
  url: 'https://dtech.vn',
  email: 'sales@dtech.vn',
  phone: '0904 592 583',
} as const;

export const CONTACT_INFO = {
  hotline: '0904 592 583',
  email: 'sales@dtech.vn',
  address: 'Công ty Cổ phần Kỹ thuật Dtech',
  facebook: 'https://facebook.com/thietbidiendtech',
  zalo: 'https://zalo.me/thietbidiendtech',
  
  salesTeam: [
    {
      name: 'Ms. Trang',
      phone: '0934.531.598',
      email: 'trangdt@dtech.vn',
    },
    {
      name: 'Ms. Hằng',
      phone: '0931.581.569',
      email: 'hanght@dtech.vn',
    },
    {
      name: 'Ms. Hạnh',
      phone: '0904.542.598',
      email: 'hanhnt@dtech.vn',
    },
  ],
} as const;

export const BRANDS = [
  'LS',
  'Mitsubishi',
  'Schneider',
  'ABB',
  'Siemens',
  'Fuji',
  'Samwha',
  'Idec',
  'Omron',
] as const;

export const PAGINATION = {
  defaultPageSize: 12,
  pageSizeOptions: [12, 24, 48],
} as const;

export const ROUTES = {
  home: '/',
  categories: '/categories',
  products: '/products',
  posts: '/posts',
  contact: '/contact',
  about: '/about',
} as const;

export const API_ENDPOINTS = {
  categories: '/api/categories',
  products: '/api/products',
  posts: '/api/posts',
  search: '/api/search',
} as const;
