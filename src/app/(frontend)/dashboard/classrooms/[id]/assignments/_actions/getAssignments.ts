'use server'

import { getUser } from '@/app/(frontend)/_actions/getUser'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function getAssignments() {
  const payload = await getPayload({ config: configPromise })
  const user = await getUser()

  // Ambil semua membership yang approved tanpa memfilter role
  const classroomMemberships = await payload.find({
    collection: 'classroomMembers',
    where: {
      member: {
        equals: user.id,
      },
      status: {
        equals: 'approved',
      },
    },
  })

  const classroomIds = classroomMemberships.docs.map((doc) => {
    const classroom = doc.classroom
    return typeof classroom === 'object' && classroom !== null ? classroom.id : classroom
  })

  // Ambil semua assignment dari kelas yang diikuti user
  const assignmentWhere = {
    classroom: {
      in: classroomIds,
    },
  }

  const result = await payload.find({
    collection: 'assignments',
    where: assignmentWhere,
    overrideAccess: false,
    user: user,
  })

  const now = new Date()

  const assignments = await Promise.all(
    result.docs.map(async (assignment) => {
      const dueDate = assignment.dueDate ? new Date(assignment.dueDate) : null

      let status: 'In Progress' | 'Done' | 'OverDue' = assignment.isCompleted ? 'Done' : 'In Progress'

      if (dueDate && dueDate < now) {
        status = 'OverDue'
      }

      const daysLeft = dueDate
        ? Math.max(0, Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) - 1))
        : 0

      const classroom = assignment.classroom as any
      let teacherName = undefined

      if (classroom && typeof classroom === 'object') {
        const teacherEntry = await payload.find({
          collection: 'classroomMembers',
          where: {
            classroom: {
              equals: classroom.id,
            },
            role: {
              equals: 'teacher',
            },
            status: {
              equals: 'approved',
            },
          },
        })

        const teacher = teacherEntry.docs?.[0]?.member
        teacherName = typeof teacher === 'object' && teacher?.name ? teacher.name : undefined
      }

      return {
        id: String(assignment.id),
        title: assignment.title,
        description: assignment.description ?? '',
        dueDate: dueDate ? dueDate.toDateString() : '',
        daysLeft,
        classroom: {
          id: classroom?.id ? String(classroom.id) : '',
          name: classroom?.name ?? '',
          description: classroom?.description ?? '',
          teacher: teacherName,
          studentCount: classroom?.studentCount ?? undefined,
          assignmentCount: classroom?.assignmentCount ?? undefined,
          classCode: classroom?.classCode ?? undefined,
          requireApproval: classroom?.requireApproval ?? undefined,
          color: classroom?.color ?? undefined,
          createdAt: classroom?.createdAt ?? '',
          members: classroom?.members ?? undefined,
        },
        status,
      }
    })
  )

  return assignments
}
