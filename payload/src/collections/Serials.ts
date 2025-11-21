import { CollectionConfig } from 'payload'

export const Serials: CollectionConfig = {
  slug: 'serials',
  labels: {
    singular: '📚 Bộ sưu tập',
    plural: '📚 Bộ sưu tập',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Tên bộ sưu tập',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Đường dẫn',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Dòng sản phẩm',
      admin: {
        description: 'Chọn các dòng sản phẩm thuộc bộ sưu tập này',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Mô tả',
    },
  ],
  timestamps: true,
}
