'use server'

import { Submission } from '@/types/submission'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getUser } from '@/app/(frontend)/_actions/getUser'

export async function getSubmissions(
  role?: 'teacher' | 'student',
  classroomId?: string,
): Promise<Submission[]> {
  const payload = await getPayload({ config: configPromise })
  const user = await getUser()
  const userId = user.id

  const mapToSubmission = (doc: any): Submission => ({
    id: doc.id,
    classroom: typeof doc.classroom === 'string' ? doc.classroom : doc.classroom?.id,
    assignment: typeof doc.assignment === 'string' ? doc.assignment : doc.assignment?.id,
    student: typeof doc.student === 'string' ? doc.student : doc.student?.id,
    file: doc.file,
    grade: doc.grade,
    feedback: doc.feedback,
    gradedBy: typeof doc.gradedBy === 'string' ? doc.gradedBy : doc.gradedBy?.id,
    gradedAt: doc.gradedAt,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  })

  if (role === 'student') {
    const whereClause: any = {
      student: { equals: userId },
    }

    if (classroomId) {
      whereClause.classroom = { equals: classroomId }
    }

    const res = await payload.find({
      collection: 'submissions',
      where: whereClause,
      depth: 2,
    })

    return res.docs.map(mapToSubmission)
  }

  if (role === 'teacher') {
    const classroomMemberships = await payload.find({
      collection: 'classroomMembers',
      where: {
        and: [
          { member: { equals: userId } },
          { role: { equals: 'teacher' } },
          { status: { equals: 'approved' } },
        ],
      },
      depth: 0,
    })

    const teacherClassrooms = classroomMemberships.docs.map((doc) =>
      typeof doc.classroom === 'object' && doc.classroom !== null
        ? doc.classroom.id
        : doc.classroom,
    )

    // Jika classroomId diberikan, pastikan dia memang termasuk kelas guru ini
    if (classroomId && !teacherClassrooms.includes(Number(classroomId))) return []

    const res = await payload.find({
      collection: 'submissions',
      where: {
        classroom: {
          in: classroomId ? [Number(classroomId)] : teacherClassrooms,
        },
      },
      depth: 2,
    })

    return res.docs.map(mapToSubmission)
  }

  return []
}
