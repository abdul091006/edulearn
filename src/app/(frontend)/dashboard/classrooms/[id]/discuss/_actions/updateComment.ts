'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function updateComment(id: string, message: string) {
  const payload = await getPayload({ config: configPromise })
  const updated = await payload.update({
    collection: 'comments',
    id,
    data: { message },
  })

  return updated
}
