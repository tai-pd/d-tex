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
      label: 'Họ và tên',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'admin',
      label: 'Vai trò',
      options: [
        { label: 'Quản trị viên', value: 'admin' },
        { label: 'Biên tập viên', value: 'editor' },
      ],
      admin: {
        description:
          'Quản trị viên: toàn quyền. Biên tập viên: quản lý nội dung nhưng không quản lý người dùng.',
      },
    },
  ],

  timestamps: true,
}
