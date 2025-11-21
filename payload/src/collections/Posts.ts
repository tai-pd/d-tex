import { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: '📝 Bài viết',
    plural: '📝 Bài viết',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'published', 'publishedAt'],
  },
  access: {
    read: ({ req }) => {
      // Public can only read published posts
      if (req.user) return true
      return { published: { equals: true } }
    },
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Tiêu đề' },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'Đường dẫn' },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Trích dẫn',
      admin: {
        description: 'Mô tả ngắn hiển thị trong danh sách bài viết',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Ảnh đại diện',
      admin: {
        description: 'Ảnh chính hiển thị ở đầu bài viết',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Nội dung',
      admin: {
        description: 'Nội dung chính với văn bản và hình ảnh',
      },
      editor: lexicalEditor(),
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Tác giả',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Thẻ',
      admin: {
        position: 'sidebar',
      },
      fields: [{ name: 'tag', type: 'text', label: 'Tên thẻ' }],
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      label: 'Đã xuất bản',
      admin: {
        position: 'sidebar',
        description: 'Bài viết đã xuất bản sẽ hiển thị công khai',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Ngày xuất bản',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'metadata',
      type: 'group',
      label: 'Metadata SEO',
      admin: {
        position: 'sidebar',
      },
      fields: [
        { name: 'metaTitle', type: 'text', label: 'Tiêu đề SEO' },
        { name: 'metaDescription', type: 'textarea', label: 'Mô tả SEO' },
      ],
    },
  ],
  timestamps: true,
}
