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
    description: 'Quản lý nội dung và cấu hình footer',
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
      label: 'Tên',
      admin: {
        description: 'Tên nội bộ cho cấu hình footer này',
      },
    },

    // Benefits/Features Section
    {
      name: 'benefits',
      type: 'array',
      label: 'Lợi ích & Tính năng',
      admin: {
        description:
          'Thêm lợi ích/tính năng hiển thị trong footer (VD: "Bán hàng chính hãng", "Giao hàng tận nơi")',
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
          admin: {
            description: 'Icon cho lợi ích này',
          },
        },
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Văn bản',
          admin: {
            description:
              'Văn bản lợi ích (VD: "BÁN HÀNG CHÍNH HÃNG - GIAO HÀNG TẬN NƠI - TƯ VẤN MIỄN PHÍ")',
          },
        },
      ],
    },

    // Footer Columns
    {
      name: 'columns',
      type: 'group',
      label: 'Các cột Footer',
      fields: [
        // Column 1: Address
        {
          name: 'addressColumn',
          type: 'group',
          label: 'Cột địa chỉ',
          fields: [
            {
              name: 'heading',
              type: 'text',
              defaultValue: 'Địa chỉ',
              label: 'Tiêu đề',
              admin: {
                description: 'Tiêu đề cột',
              },
            },
            {
              name: 'companyName',
              type: 'text',
              label: 'Tên công ty',
              admin: {
                description: 'Tên công ty (VD: "Công ty Cổ phần Kỹ thuật Dtech")',
              },
            },
            {
              name: 'address',
              type: 'textarea',
              label: 'Địa chỉ',
              admin: {
                description: 'Địa chỉ đầy đủ',
              },
            },
            {
              name: 'mapUrl',
              type: 'text',
              label: 'URL bản đồ',
              admin: {
                description: 'URL nhúng Google Maps (không bắt buộc)',
              },
            },
          ],
        },

        // Column 2: Contact Information
        {
          name: 'contactColumn',
          type: 'group',
          label: 'Cột thông tin liên hệ',
          fields: [
            {
              name: 'heading',
              type: 'text',
              defaultValue: 'Thông tin liên hệ',
              label: 'Tiêu đề',
              admin: {
                description: 'Tiêu đề cột',
              },
            },
            {
              name: 'contacts',
              type: 'array',
              label: 'Người liên hệ',
              admin: {
                description: 'Danh sách người liên hệ',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  label: 'Tên',
                  admin: {
                    description: 'Tên người liên hệ (VD: "Ms. Trang", "Mr. Hùng")',
                  },
                },
                {
                  name: 'phone',
                  type: 'text',
                  label: 'Số điện thoại',
                  admin: {
                    description: 'Số điện thoại',
                  },
                },
                {
                  name: 'zalo',
                  type: 'text',
                  label: 'Zalo',
                  admin: {
                    description: 'Số Zalo (nếu khác số điện thoại)',
                  },
                },
                {
                  name: 'email',
                  type: 'email',
                  label: 'Email',
                  admin: {
                    description: 'Địa chỉ email',
                  },
                },
              ],
            },
            {
              name: 'generalPhone',
              type: 'text',
              label: 'Hotline chung',
              admin: {
                description: 'Số hotline/điện thoại chung',
              },
            },
            {
              name: 'generalEmail',
              type: 'email',
              label: 'Email chung',
              admin: {
                description: 'Địa chỉ email chung',
              },
            },
          ],
        },

        // Column 3: Design & Construction Services
        {
          name: 'servicesColumn',
          type: 'group',
          label: 'Cột dịch vụ',
          fields: [
            {
              name: 'heading',
              type: 'text',
              defaultValue: 'Thiết kế và Lắp đặt Tủ điện',
              label: 'Tiêu đề',
              admin: {
                description: 'Tiêu đề cột',
              },
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Nội dung',
              admin: {
                description: 'Mô tả dịch vụ hoặc danh sách',
              },
              editor: lexicalEditor(),
            },
            {
              name: 'links',
              type: 'array',
              label: 'Liên kết nhanh',
              admin: {
                description: 'Thêm liên kết nhanh đến dịch vụ hoặc trang',
              },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                  label: 'Văn bản',
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                  label: 'URL',
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
      label: 'Nội dung cuối',
      fields: [
        {
          name: 'copyrightText',
          type: 'text',
          defaultValue: '© 2024 Dtech. All rights reserved.',
          label: 'Văn bản bản quyền',
          admin: {
            description: 'Văn bản bản quyền',
          },
        },
        {
          name: 'additionalLinks',
          type: 'array',
          label: 'Liên kết bổ sung',
          admin: {
            description: 'Liên kết cho chính sách bảo mật, điều khoản, v.v.',
          },
          fields: [
            { name: 'text', type: 'text', required: true, label: 'Văn bản' },
            { name: 'url', type: 'text', required: true, label: 'URL' },
          ],
        },
      ],
    },

    // Social Media
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Mạng xã hội',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook',
          admin: {
            description: 'URL trang Facebook',
          },
        },
        {
          name: 'zalo',
          type: 'text',
          label: 'Zalo',
          admin: {
            description: 'URL Zalo',
          },
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube',
          admin: {
            description: 'URL kênh YouTube',
          },
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn',
          admin: {
            description: 'URL LinkedIn',
          },
        },
      ],
    },

    // Active/Published
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Đang hoạt động',
      admin: {
        description: 'Đặt footer này là đang hoạt động',
      },
    },
  ],
  timestamps: true,
}
