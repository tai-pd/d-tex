import { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: '📄 Trang chủ',
    plural: '📄 Trang chủ',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'layout', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    // Basic Information
    { name: 'title', type: 'text', required: true, label: 'Tiêu đề trang' },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'Đường dẫn' },

    // Layout Options
    {
      name: 'layout',
      type: 'select',
      required: true,
      defaultValue: 'standard',
      label: 'Bố cục',
      options: [
        { label: 'Trang chủ', value: 'home' },
        { label: 'Giới thiệu', value: 'about' },
        { label: 'Liên hệ', value: 'contact' },
        { label: 'Trang tiêu chuẩn', value: 'standard' },
      ],
      admin: {
        description: 'Chọn mẫu bố cục cho trang này',
      },
    },

    // SEO Group
    {
      name: 'seo',
      type: 'group',
      label: 'Metadata SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          maxLength: 60,
          label: 'Tiêu đề SEO',
          admin: {
            description: 'Tiêu đề SEO (tối đa 60 ký tự). Để trống để sử dụng tiêu đề trang.',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
          label: 'Mô tả SEO',
          admin: {
            description: 'Mô tả SEO cho công cụ tìm kiếm (tối đa 160 ký tự)',
          },
        },
        {
          name: 'metaKeywords',
          type: 'text',
          label: 'Từ khóa SEO',
          admin: {
            description: 'Từ khóa SEO, phân cách bằng dấu phẩy',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Ảnh OG',
          admin: {
            description: 'Ảnh chia sẻ mạng xã hội (Open Graph)',
          },
        },
        {
          name: 'ogTitle',
          type: 'text',
          label: 'Tiêu đề mạng xã hội',
          admin: {
            description: 'Tiêu đề mạng xã hội. Để trống để sử dụng tiêu đề trang.',
          },
        },
        {
          name: 'ogDescription',
          type: 'textarea',
          label: 'Mô tả mạng xã hội',
          admin: {
            description: 'Mô tả mạng xã hội. Để trống để sử dụng mô tả SEO.',
          },
        },
      ],
    },

    // Hero Section
    {
      name: 'hero',
      type: 'group',
      label: 'Phần Hero',
      fields: [
        {
          name: 'showHero',
          type: 'checkbox',
          defaultValue: true,
          label: 'Hiển thị Hero',
          admin: {
            description: 'Hiển thị phần hero trên trang này',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Tiêu đề',
          admin: {
            description: 'Tiêu đề chính trong phần hero',
            condition: (data, siblingData) => siblingData?.showHero,
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Tiêu đề phụ',
          admin: {
            description: 'Tiêu đề phụ trong phần hero',
            condition: (data, siblingData) => siblingData?.showHero,
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Mô tả',
          admin: {
            description: 'Văn bản mô tả hero',
            condition: (data, siblingData) => siblingData?.showHero,
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Ảnh nền',
          admin: {
            description: 'Ảnh nền hero',
            condition: (data, siblingData) => siblingData?.showHero,
          },
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Văn bản nút',
          admin: {
            description: 'Văn bản nút kêu gọi hành động',
            condition: (data, siblingData) => siblingData?.showHero,
          },
        },
        {
          name: 'buttonLink',
          type: 'text',
          label: 'Liên kết nút',
          admin: {
            description: 'URL nút kêu gọi hành động',
            condition: (data, siblingData) => siblingData?.showHero,
          },
        },
      ],
    },

    // Featured Categories
    {
      name: 'featuredCategories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Dòng sản phẩm nổi bật',
      admin: {
        description: 'Chọn dòng sản phẩm để hiển thị trên trang này',
      },
    },

    // Main Content
    {
      name: 'content',
      type: 'richText',
      label: 'Nội dung chính',
      admin: {
        description: 'Nội dung chính (văn bản định dạng)',
      },
      editor: lexicalEditor(),
    },

    // Flexible Content Blocks
    {
      name: 'sections',
      type: 'blocks',
      label: 'Các phần trang',
      admin: {
        description: 'Thêm các phần nội dung động vào trang này',
      },
      blocks: [
        // Text Section Block
        {
          slug: 'textSection',
          labels: {
            singular: 'Phần văn bản',
            plural: 'Các phần văn bản',
          },
          fields: [
            { name: 'heading', type: 'text', required: true, label: 'Tiêu đề' },
            {
              name: 'content',
              type: 'richText',
              required: true,
              label: 'Nội dung',
              editor: lexicalEditor(),
            },
            {
              name: 'backgroundColor',
              type: 'select',
              defaultValue: 'white',
              label: 'Màu nền',
              options: [
                { label: 'Trắng', value: 'white' },
                { label: 'Xám nhạt', value: 'gray' },
                { label: 'Tối', value: 'dark' },
              ],
            },
          ],
        },
        // Image Gallery Block
        {
          slug: 'imageGallery',
          labels: {
            singular: 'Thư viện ảnh',
            plural: 'Thư viện ảnh',
          },
          fields: [
            { name: 'heading', type: 'text', label: 'Tiêu đề' },
            {
              name: 'images',
              type: 'array',
              required: true,
              minRows: 1,
              label: 'Hình ảnh',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  label: 'Ảnh',
                },
                { name: 'caption', type: 'text', label: 'Chú thích' },
              ],
            },
            {
              name: 'columns',
              type: 'select',
              defaultValue: '3',
              label: 'Số cột',
              options: [
                { label: '2 cột', value: '2' },
                { label: '3 cột', value: '3' },
                { label: '4 cột', value: '4' },
              ],
            },
          ],
        },
        // Video Section Block
        {
          slug: 'videoSection',
          labels: {
            singular: 'Phần video',
            plural: 'Các phần video',
          },
          fields: [
            { name: 'heading', type: 'text', label: 'Tiêu đề' },
            {
              name: 'videoUrl',
              type: 'text',
              required: true,
              label: 'URL video',
              admin: {
                description: 'URL YouTube hoặc Vimeo',
              },
            },
            { name: 'description', type: 'textarea', label: 'Mô tả' },
          ],
        },
        // Call to Action Block
        {
          slug: 'ctaSection',
          labels: {
            singular: 'Kêu gọi hành động',
            plural: 'Kêu gọi hành động',
          },
          fields: [
            { name: 'heading', type: 'text', required: true, label: 'Tiêu đề' },
            { name: 'description', type: 'textarea', label: 'Mô tả' },
            { name: 'buttonText', type: 'text', required: true, label: 'Văn bản nút' },
            { name: 'buttonLink', type: 'text', required: true, label: 'Liên kết nút' },
            {
              name: 'backgroundColor',
              type: 'select',
              defaultValue: 'primary',
              label: 'Màu nền',
              options: [
                { label: 'Màu chính', value: 'primary' },
                { label: 'Màu phụ', value: 'secondary' },
                { label: 'Tối', value: 'dark' },
              ],
            },
          ],
        },
        // Products Showcase Block
        {
          slug: 'productsSection',
          labels: {
            singular: 'Phần sản phẩm',
            plural: 'Các phần sản phẩm',
          },
          fields: [
            { name: 'heading', type: 'text', required: true, label: 'Tiêu đề' },
            { name: 'description', type: 'textarea', label: 'Mô tả' },
            {
              name: 'products',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              label: 'Sản phẩm',
              admin: {
                description: 'Chọn sản phẩm để hiển thị',
              },
            },
            {
              name: 'displayStyle',
              type: 'select',
              defaultValue: 'grid',
              label: 'Kiểu hiển thị',
              options: [
                { label: 'Lưới', value: 'grid' },
                { label: 'Băng chuyền', value: 'carousel' },
                { label: 'Danh sách', value: 'list' },
              ],
            },
          ],
        },
        // Custom HTML Block
        {
          slug: 'customHTML',
          labels: {
            singular: 'HTML tùy chỉnh',
            plural: 'Các khối HTML tùy chỉnh',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Nhãn',
              admin: { description: 'Nhãn nội bộ cho khối này' },
            },
            {
              name: 'html',
              type: 'textarea',
              required: true,
              label: 'Mã HTML',
              admin: {
                description: 'Mã HTML tùy chỉnh',
              },
            },
          ],
        },
      ],
    },

    // Publishing Options
    { name: 'published', type: 'checkbox', defaultValue: true, label: 'Đã xuất bản' },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' }, label: 'Ngày xuất bản' },
  ],
  timestamps: true,
}
