// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { s3Storage } from '@payloadcms/storage-s3'
import { Brands } from './collections/Brands'
import { Categories } from './collections/Categories'
import { Contacts } from './collections/Contacts'
import { Footers } from './collections/Footers'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Products } from './collections/Products'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const enableR2 =
  !!process.env.R2_BUCKET && !!process.env.R2_ACCESS_KEY_ID && !!process.env.R2_SECRET_ACCESS_KEY

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Brands, Categories, Contacts, Footers, Pages, Products],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : undefined,
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      enabled: enableR2,
      bucket: process.env.R2_BUCKET || '',
      config: {
        region: process.env.R2_REGION || 'auto',
        endpoint: process.env.R2_ENDPOINT,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
      },
      collections: {
        media: {
          generateFileURL: ({ filename }) => {
            return `${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET}/${filename}`
          },
        },
      },
    }),
  ],
})
