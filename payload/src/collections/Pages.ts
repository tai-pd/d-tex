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
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },

    // Layout Options
    {
      name: 'layout',
      type: 'select',
      required: true,
      defaultValue: 'standard',
      options: [
        { label: 'Homepage', value: 'home' },
        { label: 'About', value: 'about' },
        { label: 'Contact', value: 'contact' },
        { label: 'Standard Page', value: 'standard' },
      ],
      admin: {
        description: 'Choose the layout template for this page',
      },
    },

    // SEO Group
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Metadata',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          maxLength: 60,
          admin: {
            description: 'SEO title (max 60 characters). Leave empty to use page title.',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
          admin: {
            description: 'SEO description for search engines (max 160 characters)',
          },
        },
        {
          name: 'metaKeywords',
          type: 'text',
          admin: {
            description: 'SEO keywords, separated by commas',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Image for social media sharing (Open Graph)',
          },
        },
        {
          name: 'ogTitle',
          type: 'text',
          admin: {
            description: 'Social media title. Leave empty to use page title.',
          },
        },
        {
          name: 'ogDescription',
          type: 'textarea',
          admin: {
            description: 'Social media description. Leave empty to use meta description.',
          },
        },
      ],
    },

    // Hero Section
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'showHero',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Display hero section on this page',
          },
        },
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'Main heading in hero section',
            condition: (data, siblingData) => siblingData?.showHero,
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          admin: {
            description: 'Subheading in hero section',
            condition: (data, siblingData) => siblingData?.showHero,
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Hero description text',
            condition: (data, siblingData) => siblingData?.showHero,
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Hero background image',
            condition: (data, siblingData) => siblingData?.showHero,
          },
        },
        {
          name: 'buttonText',
          type: 'text',
          admin: {
            description: 'Call-to-action button text',
            condition: (data, siblingData) => siblingData?.showHero,
          },
        },
        {
          name: 'buttonLink',
          type: 'text',
          admin: {
            description: 'Call-to-action button URL',
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
      admin: {
        description: 'Select categories to display on this page',
      },
    },

    // Main Content
    {
      name: 'content',
      type: 'richText',
      admin: {
        description: 'Main content (rich text)',
      },
      editor: lexicalEditor(),
    },

    // Flexible Content Blocks
    {
      name: 'sections',
      type: 'blocks',
      label: 'Page Sections',
      admin: {
        description: 'Add dynamic content sections to this page',
      },
      blocks: [
        // Text Section Block
        {
          slug: 'textSection',
          labels: {
            singular: 'Text Section',
            plural: 'Text Sections',
          },
          fields: [
            { name: 'heading', type: 'text', required: true },
            {
              name: 'content',
              type: 'richText',
              required: true,
              editor: lexicalEditor(),
            },
            {
              name: 'backgroundColor',
              type: 'select',
              defaultValue: 'white',
              options: [
                { label: 'White', value: 'white' },
                { label: 'Light Gray', value: 'gray' },
                { label: 'Dark', value: 'dark' },
              ],
            },
          ],
        },
        // Image Gallery Block
        {
          slug: 'imageGallery',
          labels: {
            singular: 'Image Gallery',
            plural: 'Image Galleries',
          },
          fields: [
            { name: 'heading', type: 'text' },
            {
              name: 'images',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                { name: 'caption', type: 'text' },
              ],
            },
            {
              name: 'columns',
              type: 'select',
              defaultValue: '3',
              options: [
                { label: '2 Columns', value: '2' },
                { label: '3 Columns', value: '3' },
                { label: '4 Columns', value: '4' },
              ],
            },
          ],
        },
        // Video Section Block
        {
          slug: 'videoSection',
          labels: {
            singular: 'Video Section',
            plural: 'Video Sections',
          },
          fields: [
            { name: 'heading', type: 'text' },
            {
              name: 'videoUrl',
              type: 'text',
              required: true,
              admin: {
                description: 'YouTube or Vimeo URL',
              },
            },
            { name: 'description', type: 'textarea' },
          ],
        },
        // Call to Action Block
        {
          slug: 'ctaSection',
          labels: {
            singular: 'Call to Action',
            plural: 'Call to Actions',
          },
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            { name: 'buttonText', type: 'text', required: true },
            { name: 'buttonLink', type: 'text', required: true },
            {
              name: 'backgroundColor',
              type: 'select',
              defaultValue: 'primary',
              options: [
                { label: 'Primary Color', value: 'primary' },
                { label: 'Secondary Color', value: 'secondary' },
                { label: 'Dark', value: 'dark' },
              ],
            },
          ],
        },
        // Products Showcase Block
        {
          slug: 'productsSection',
          labels: {
            singular: 'Products Section',
            plural: 'Products Sections',
          },
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            {
              name: 'products',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              admin: {
                description: 'Select products to display',
              },
            },
            {
              name: 'displayStyle',
              type: 'select',
              defaultValue: 'grid',
              options: [
                { label: 'Grid', value: 'grid' },
                { label: 'Carousel', value: 'carousel' },
                { label: 'List', value: 'list' },
              ],
            },
          ],
        },
        // Custom HTML Block
        {
          slug: 'customHTML',
          labels: {
            singular: 'Custom HTML',
            plural: 'Custom HTML Blocks',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: { description: 'Internal label for this block' },
            },
            {
              name: 'html',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Custom HTML code',
              },
            },
          ],
        },
      ],
    },

    // Publishing Options
    { name: 'published', type: 'checkbox', defaultValue: true },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
  ],
  timestamps: true,
}
