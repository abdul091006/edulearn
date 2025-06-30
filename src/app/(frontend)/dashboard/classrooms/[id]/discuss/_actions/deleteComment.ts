'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function deleteComment(id: string) {
  const payload = await getPayload({ config: configPromise })
  await payload.delete({
    collection: 'comments',
    id,
  })
}
