'use server' // harus ada ini supaya jadi server action
 // ini server only, fine
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getUser } from '@/app/(frontend)/_actions/getUser'

export async function createClassroom({
  name,
  description,
  classCode,
  requireApproval,
}: {
  name: string
  description?: string
  classCode: string
  requireApproval?: boolean
}) {
  const payload = await getPayload({ config: configPromise })
  const user = await getUser()
  if (!user) throw new Error('Not authenticated')

  const classroom = await payload.create({
    collection: 'classrooms',
    data: {
      name,
      description,
      classCode,
      requireApproval: requireApproval ?? true,
    },
  })

  await payload.create({
    collection: 'classroomMembers',
    data: {
      classroom: classroom.id,
      member: user.id,
      role: 'teacher',
      status: 'approved',
      joinedAt: new Date().toISOString(),
    },
  })

  return classroom
}
