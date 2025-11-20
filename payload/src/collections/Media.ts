// payload/collections/Media.ts
import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: '🖼️ Hình ảnh',
    plural: '🖼️ Hình ảnh',
  },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'mimeType', 'filesize'],
  },

  access: {
    read: () => true, // public can read URLs
    create: ({ req }) => !!req.user, // only admin upload
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },

  upload: {
    disableLocalStorage: true, // IMPORTANT: do not store files locally
    mimeTypes: ['image/*'], // allow only images
  },

  fields: [
    { name: 'alt', type: 'text' },
    { name: 'caption', type: 'text' },
  ],

  timestamps: true,
}
