'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function approveMember(id: string) {
  const payload = await getPayload({ config: configPromise })
  await payload.update({
    collection: 'classroomMembers',
    id,
    data: {
      status: 'approved',
      joinedAt: new Date().toISOString(),
    },
  })
}

export async function rejectMember(id: string) {
  const payload = await getPayload({ config: configPromise })
  await payload.update({
    collection: 'classroomMembers',
    id,
    data: {
      status: 'rejected',
    },
  })
}
