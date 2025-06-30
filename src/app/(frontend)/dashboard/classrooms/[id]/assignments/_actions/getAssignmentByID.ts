'use server'

import { getUser } from '@/app/(frontend)/_actions/getUser'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function getAssignmentByID({ id }: { id: string }) {
  const payload = await getPayload({ config: configPromise })
  const user = await getUser()

  const assignment = await payload.findByID({
    collection: 'assignments',
    id,
    overrideAccess: true,
    user,
    depth: 1,
  })

  const now = new Date()
  const dueDate = assignment.dueDate ? new Date(assignment.dueDate) : null

  // Cek apakah user sudah mengirim submission untuk assignment ini
  const submissionEntry = await payload.find({
    collection: 'submissions',
    where: {
      assignment: { equals: assignment.id },
      student: { equals: user.id },
    },
    limit: 1,
  })

  const isSubmitted = submissionEntry.totalDocs > 0

  // Status berdasarkan submission user
  let status: 'In Progress' | 'Done' | 'OverDue' = isSubmitted ? 'Done' : 'In Progress'
  if (dueDate && dueDate < now && !isSubmitted) {
    status = 'OverDue'
  }

  const daysLeft = dueDate
    ? Math.max(0, Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) - 1))
    : 0

  const classroomData = assignment.classroom
  if (!classroomData || typeof classroomData !== 'object' || !('id' in classroomData)) {
    throw new Error('Assignment must have a valid classroom.')
  }

  const classroomId = String(classroomData.id)

  const teacherEntry = await payload.find({
    collection: 'classroomMembers',
    where: {
      classroom: { equals: classroomId },
      role: { equals: 'teacher' },
      status: { equals: 'approved' },
    },
    depth: 2,
    limit: 1,
  })

  const teacher = teacherEntry.docs?.[0]?.member
  const teacherName = typeof teacher === 'object' && teacher?.name ? teacher.name : undefined

  const classroom = {
    id: classroomId,
    name: classroomData.name ?? '',
    description: classroomData.description ?? '',
    createdAt: classroomData.createdAt ?? '',
    classCode: classroomData.classCode ?? '',
    teacher: teacherName,
  }

  return {
    id: String(assignment.id),
    title: assignment.title,
    description: assignment.description ?? '',
    dueDate: dueDate ? dueDate.toISOString() : '',
    daysLeft,
    classroom,
    status,
  }
}
