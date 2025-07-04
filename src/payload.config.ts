// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import Comments from './collections/Comments'
import Classrooms from './collections/Classrooms'
import Assignments from './collections/Assignments'
import Submissions from './collections/Submissions'

import { s3Storage } from '@payloadcms/storage-s3'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Members from './collections/Members'
import ClassroomMembers from './collections/ClassroomMembers'
import Materials from './collections/Materials'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users,
    Media,
    Comments,
    Classrooms,
    Assignments,
    Submissions,
    Members,
    ClassroomMembers,
    Materials,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
          collections: {
            media: true,
          },
          bucket: process.env.S3_BUCKET_NAME || "",
          config: {
            region: process.env.S3_REGION || "",
            endpoint: process.env.S3_ENDPOINT || "",
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY || "",
              secretAccessKey: process.env.S3_SECRET_KEY || "",
            }
          }
        })
  ],
})
