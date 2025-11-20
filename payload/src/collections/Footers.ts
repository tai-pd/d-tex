import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Footers: CollectionConfig = {
  slug: 'footers',
  labels: {
    singular: '🦶 Footer',
    plural: '🦶 Footers',
  },
  admin: {
    useAsTitle: 'name',
    description: 'Manage footer content and configuration',
  },
  // Use singleton pattern - only one footer configuration
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: 'Main Footer',
      admin: {
        description: 'Internal name for this footer configuration',
      },
    },

    // Benefits/Features Section
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefits & Features',
      admin: {
        description:
          'Add benefits/features to display in footer (e.g., "Bán hàng chính hãng", "Giao hàng tận nơi")',
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Icon for this benefit',
          },
        },
        {
          name: 'text',
          type: 'text',
          required: true,
          admin: {
            description:
              'Benefit text (e.g., "BÁN HÀNG CHÍNH HÃNG - GIAO HÀNG TẬN NƠI - TƯ VẤN MIỄN PHÍ")',
          },
        },
      ],
    },

    // Footer Columns
    {
      name: 'columns',
      type: 'group',
      label: 'Footer Columns',
      fields: [
        // Column 1: Address
        {
          name: 'addressColumn',
          type: 'group',
          label: 'Địa chỉ (Address)',
          fields: [
            {
              name: 'heading',
              type: 'text',
              defaultValue: 'Địa chỉ',
              admin: {
                description: 'Column heading',
              },
            },
            {
              name: 'companyName',
              type: 'text',
              admin: {
                description: 'Company name (e.g., "Công ty Cổ phần Kỹ thuật Dtech")',
              },
            },
            {
              name: 'address',
              type: 'textarea',
              admin: {
                description: 'Full address',
              },
            },
            {
              name: 'mapUrl',
              type: 'text',
              admin: {
                description: 'Google Maps embed URL (optional)',
              },
            },
          ],
        },

        // Column 2: Contact Information
        {
          name: 'contactColumn',
          type: 'group',
          label: 'Thông tin liên hệ (Contact Info)',
          fields: [
            {
              name: 'heading',
              type: 'text',
              defaultValue: 'Thông tin liên hệ',
              admin: {
                description: 'Column heading',
              },
            },
            {
              name: 'contacts',
              type: 'array',
              label: 'Contact People',
              admin: {
                description: 'List of contact people',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Contact name (e.g., "Ms. Trang", "Mr. Hùng")',
                  },
                },
                {
                  name: 'phone',
                  type: 'text',
                  admin: {
                    description: 'Phone number',
                  },
                },
                {
                  name: 'zalo',
                  type: 'text',
                  admin: {
                    description: 'Zalo number (if different from phone)',
                  },
                },
                {
                  name: 'email',
                  type: 'email',
                  admin: {
                    description: 'Email address',
                  },
                },
              ],
            },
            {
              name: 'generalPhone',
              type: 'text',
              admin: {
                description: 'General hotline/phone number',
              },
            },
            {
              name: 'generalEmail',
              type: 'email',
              admin: {
                description: 'General email address',
              },
            },
          ],
        },

        // Column 3: Design & Construction Services
        {
          name: 'servicesColumn',
          type: 'group',
          label: 'Thông tin thiết kế thi công (Services Info)',
          fields: [
            {
              name: 'heading',
              type: 'text',
              defaultValue: 'Thiết kế và Lắp đặt Tủ điện',
              admin: {
                description: 'Column heading',
              },
            },
            {
              name: 'content',
              type: 'richText',
              admin: {
                description: 'Services description or list',
              },
              editor: lexicalEditor(),
            },
            {
              name: 'links',
              type: 'array',
              label: 'Quick Links',
              admin: {
                description: 'Add quick links to services or pages',
              },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },

    // Additional Footer Content
    {
      name: 'bottomContent',
      type: 'group',
      label: 'Bottom Content',
      fields: [
        {
          name: 'copyrightText',
          type: 'text',
          defaultValue: '© 2024 Dtech. All rights reserved.',
          admin: {
            description: 'Copyright text',
          },
        },
        {
          name: 'additionalLinks',
          type: 'array',
          label: 'Additional Links',
          admin: {
            description: 'Links for privacy policy, terms, etc.',
          },
          fields: [
            { name: 'text', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },

    // Social Media
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Social Media',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          admin: {
            description: 'Facebook page URL',
          },
        },
        {
          name: 'zalo',
          type: 'text',
          admin: {
            description: 'Zalo URL',
          },
        },
        {
          name: 'youtube',
          type: 'text',
          admin: {
            description: 'YouTube channel URL',
          },
        },
        {
          name: 'linkedin',
          type: 'text',
          admin: {
            description: 'LinkedIn URL',
          },
        },
      ],
    },

    // Active/Published
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Set this footer as active',
      },
    },
  ],
  timestamps: true,
}
