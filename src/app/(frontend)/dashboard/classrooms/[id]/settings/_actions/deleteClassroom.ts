'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function deleteClassroomByID(id: string) {
  const payload = await getPayload({ config: configPromise })

  // Hapus semua comments terkait classroom
  await payload.delete({
    collection: 'comments',
    where: {
      classroom: { equals: id },
    },
  })

  // Hapus semua materials terkait classroom
  await payload.delete({
    collection: 'materials',
    where: {
      classroom: { equals: id },
    },
  })

  // Hapus semua submissions terkait classroom
  await payload.delete({
    collection: 'submissions',
    where: {
      classroom: { equals: id },
    },
  })

  // Hapus semua assignments terkait classroom
  await payload.delete({
    collection: 'assignments',
    where: {
      classroom: { equals: id },
    },
  })

  // Hapus semua classroomMembers terkait classroom
  await payload.delete({
    collection: 'classroomMembers',
    where: {
      classroom: { equals: id },
    },
  })

  // hapus classroom itu sendiri
  await payload.delete({
    collection: 'classrooms',
    id,
  })
}
