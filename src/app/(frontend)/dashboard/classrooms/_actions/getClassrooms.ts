'use server'

import { getPayload } from 'payload'
import { getUser } from '@/app/(frontend)/_actions/getUser'
import configPromise from '@payload-config'
import type { Classroom } from '@/types/classroom'
import type { ClassroomMember } from '@/types/classroomMember'

function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360)
  return `hsl(${hue}, 70%, 85%)`
}

function getRandomGradient() {
  const color1 = getRandomPastelColor()
  const color2 = getRandomPastelColor()
  return `linear-gradient(135deg, ${color1}, ${color2})`
}

export default async function getClassrooms(role?: 'teacher' | 'student'): Promise<Classroom[]> {
  const payload = await getPayload({ config: configPromise })
  const user = await getUser()

  if (!user) return []

  // Ambil classroomMember berdasarkan user yang sedang login
  const classroomMemberships = await payload.find({
    collection: 'classroomMembers',
    where: {
      member: { equals: user.id },
      status: { equals: 'approved' },
      ...(role && { role: { equals: role } }),
    },
    depth: 1,
    overrideAccess: false,
    user,
  })

  const enrichedClassrooms: Classroom[] = []

  for (const cm of classroomMemberships.docs) {
    const classroomData = cm.classroom
    if (!classroomData || typeof classroomData !== 'object') continue

    const classroomId = classroomData.id

    // Ambil semua member dari classroom ini
    const classroomMembers = await payload.find({
      collection: 'classroomMembers',
      where: {
        classroom: { equals: classroomId },
        status: { equals: 'approved' },
      },
      depth: 1,
      overrideAccess: false,
      user,
    })

    const members: ClassroomMember[] = classroomMembers.docs.map((cm) => ({
      id: String(cm.id),
      role: cm.role,
      status: cm.status,
      member:
        typeof cm.member === 'object' && cm.member !== null
          ? {
              name: cm.member.name,
              email: cm.member.email,
              id: cm.member.id ? String(cm.member.id) : undefined,
            }
          : String(cm.member),
    }))

    const students = members.filter((m) => m.role === 'student')
    const teacherMember = members.find((m) => m.role === 'teacher')

    const teacherName =
      teacherMember && typeof teacherMember.member === 'object' && 'name' in teacherMember.member
        ? teacherMember.member.name
        : 'Unknown Teacher'

    const assignmentData = await payload.find({
      collection: 'assignments',
      where: { classroom: { equals: classroomId } },
      overrideAccess: false,
      user,
    })

    enrichedClassrooms.push({
      id: String(classroomId),
      name: classroomData.name,
      description: classroomData.description || '',
      teacher: teacherName,
      classCode: classroomData.classCode,
      requireApproval: classroomData.requireApproval || false,
      createdAt: classroomData.createdAt,
      studentCount: students.length,
      assignmentCount: assignmentData.totalDocs || 0,
      color: getRandomGradient(),
      members,
    })
  }

  return enrichedClassrooms
}
