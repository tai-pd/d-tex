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
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'text', required: true },
    { name: 'phone', type: 'text' },
    { name: 'company', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      hasMany: false,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Closed', value: 'closed' },
      ],
      defaultValue: 'new',
    },
    { name: 'internalNotes', type: 'textarea', admin: { position: 'sidebar' } },
  ],
  timestamps: true,
}
