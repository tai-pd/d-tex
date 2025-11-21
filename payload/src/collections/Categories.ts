import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: '📂 Dòng sản phẩm',
    plural: '📂 Dòng sản phẩm',
  },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'slug', 'order'] },
  access: {
    create: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Tên dòng sản phẩm' },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'Đường dẫn' },
    { name: 'description', type: 'textarea', label: 'Mô tả' },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      label: 'Dòng sản phẩm cha',
      admin: { description: 'Dòng sản phẩm cha (không bắt buộc)' },
    },
    { name: 'order', type: 'number', label: 'Thứ tự' },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Hình ảnh' },
    {
      name: 'metadata',
      type: 'group',
      label: 'Metadata SEO',
      fields: [
        { name: 'metaTitle', type: 'text', label: 'Tiêu đề SEO' },
        { name: 'metaDescription', type: 'textarea', label: 'Mô tả SEO' },
      ],
    },
  ],
}
