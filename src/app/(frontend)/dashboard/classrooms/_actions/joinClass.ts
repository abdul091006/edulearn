'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getUser } from '@/app/(frontend)/_actions/getUser'

export async function joinClass(classCode: string) {
  const payload = await getPayload({ config: configPromise })
  const user = await getUser()

  if (!user || !user.id) {
    return { success: false, message: 'Unauthorized' }
  }

  // Cari classroom berdasarkan classCode
  const classroomResult = await payload.find({
    collection: 'classrooms',
    where: {
      classCode: {
        equals: classCode,
      },
    },
  })

  if (!classroomResult.docs.length) {
    return { success: false, message: 'Class not found' }
  }

  const classroom = classroomResult.docs[0]

  // Cek apakah member sudah join sebelumnya
  const existing = await payload.find({
    collection: 'classroomMembers',
    where: {
      member: { equals: user.id },
      classroom: { equals: classroom.id },
    },
  })

  if (existing.totalDocs > 0) {
    return { success: false, message: 'You have already joined or requested to join this class.' }
  }

  const status = classroom.requireApproval ? 'pending' : 'approved'

  await payload.create({
    collection: 'classroomMembers',
    data: {
      member: user.id,
      classroom: classroom.id,
      role: 'student',
      status,
    },
  })

  return {
    success: true,
    message:
      status === 'approved'
        ? 'Successfully joined the class.'
        : 'Join request sent. Waiting for teacher approval.',
  }
}
