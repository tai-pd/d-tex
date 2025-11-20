import { CollectionConfig } from 'payload'

export const Brands: CollectionConfig = {
  slug: 'brands',
  labels: {
    singular: '🏷️ Thương hiệu',
    plural: '🏷️ Thương hiệu',
  },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'slug'] },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Tên thương hiệu' },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'Đường dẫn' },
    { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo' },
    { name: 'website', type: 'text', label: 'Website' },
    { name: 'description', type: 'textarea', label: 'Mô tả' },
    { name: 'country', type: 'text', label: 'Quốc gia' },
  ],
  timestamps: true,
}
