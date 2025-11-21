import { CollectionConfig } from 'payload'

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  labels: {
    singular: '📧 Liên hệ',
    plural: '📧 Liên hệ',
  },
  admin: { useAsTitle: 'name', defaultColumns: ['email', 'name', 'createdAt'] },
  access: {
    create: () => true, // public form can create
    read: ({ req }) => !!req.user, // only admin can read
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Họ và tên' },
    { name: 'email', type: 'text', required: true, label: 'Email' },
    { name: 'phone', type: 'text', label: 'Số điện thoại' },
    { name: 'company', type: 'text', label: 'Công ty' },
    { name: 'message', type: 'textarea', required: true, label: 'Nội dung' },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      hasMany: false,
      label: 'Sản phẩm quan tâm',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Trạng thái',
      options: [
        { label: 'Mới', value: 'new' },
        { label: 'Đã liên hệ', value: 'contacted' },
        { label: 'Đã đóng', value: 'closed' },
      ],
      defaultValue: 'new',
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      label: 'Ghi chú nội bộ',
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}
