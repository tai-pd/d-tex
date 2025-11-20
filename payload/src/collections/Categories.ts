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
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      admin: { description: 'Parent category (optional)' },
    },
    { name: 'order', type: 'number' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'metadata',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
}
