import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: '⚡ Sản phẩm',
    plural: '⚡ Sản phẩm',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'sku', 'brand', 'category', 'published'],
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'sku', type: 'text' },
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      hasMany: false,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
    },
    { name: 'shortDescription', type: 'textarea' },
    {
      name: 'applications',
      type: 'textarea',
      admin: {
        description: 'Ứng dụng của sản phẩm (VD: Nhà máy, tòa nhà, hệ thống điện dân dụng)',
      },
    },
    { name: 'description', type: 'richText', editor: lexicalEditor() },
    {
      name: 'specs',
      label: 'Specifications',
      type: 'array',
      fields: [
        { name: 'key', type: 'text' },
        { name: 'value', type: 'text' },
      ],
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: { description: 'Product images (use R2 upload)' },
    },
    {
      name: 'catalog',
      label: 'Catalog (PDF)',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
    { name: 'published', type: 'checkbox', defaultValue: true },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
    { name: 'stock', type: 'number' },
  ],
  timestamps: true,
}
