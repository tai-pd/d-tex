// payload/collections/Users.ts
import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: '👤 Người dùng',
    plural: '👤 Người dùng',
  },
  auth: true, // Enable authentication

  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role'],
  },

  access: {
    read: ({ req }) => !!req.user, // only logged-in users can view users
    create: ({ req }) => !!req.user, // only admin can create other admins
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'admin',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      admin: {
        description: 'Admin: full access. Editor: can manage data but cannot manage users.',
      },
    },
  ],

  timestamps: true,
}
