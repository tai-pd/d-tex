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
    { name: 'title', type: 'text', required: true, label: 'Tên sản phẩm' },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'Đường dẫn' },
    { name: 'sku', type: 'text', label: 'Mã SKU' },
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      hasMany: false,
      label: 'Thương hiệu',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      label: 'Dòng sản phẩm',
    },
    { name: 'shortDescription', type: 'textarea', label: 'Mô tả ngắn' },
    {
      name: 'applications',
      type: 'textarea',
      label: 'Ứng dụng',
      admin: {
        description: 'Ứng dụng của sản phẩm (VD: Nhà máy, tòa nhà, hệ thống điện dân dụng)',
      },
    },
    { name: 'description', type: 'richText', editor: lexicalEditor(), label: 'Mô tả chi tiết' },
    {
      name: 'specs',
      label: 'Thông số kỹ thuật',
      type: 'array',
      fields: [
        { name: 'key', type: 'text', label: 'Tên thông số' },
        { name: 'value', type: 'text', label: 'Giá trị' },
      ],
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Hình ảnh',
      admin: { description: 'Hình ảnh sản phẩm (sử dụng R2 upload)' },
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
      label: 'Sản phẩm liên quan',
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text', label: 'Tiêu đề SEO' },
        { name: 'metaDescription', type: 'textarea', label: 'Mô tả SEO' },
        { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'Ảnh OG' },
      ],
    },
    { name: 'published', type: 'checkbox', defaultValue: true, label: 'Đã xuất bản' },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' }, label: 'Ngày xuất bản' },
    { name: 'stock', type: 'number', label: 'Tồn kho' },
  ],
  timestamps: true,
}
