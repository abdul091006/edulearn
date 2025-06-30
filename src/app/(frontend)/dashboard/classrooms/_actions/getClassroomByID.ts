'use server'

import { getPayload } from 'payload'
import { getUser } from '@/app/(frontend)/_actions/getUser'
import configPromise from '@payload-config'
import type { Classroom } from '@/types/classroom'
import type { ClassroomMember as ClassroomMemberType } from '@/types/classroomMember'

// Warna pastel acak
function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360)
  return `hsl(${hue}, 70%, 85%)`
}

function getRandomGradient() {
  const color1 = getRandomPastelColor()
  const color2 = getRandomPastelColor()
  return `linear-gradient(135deg, ${color1}, ${color2})`
}

// Adaptasi member supaya id bertipe string dan sesuai definisi
function adaptClassroomMember(doc: any): ClassroomMemberType {
  return {
    id: String(doc.id),
    role: doc.role,
    status: doc.status,
    member:
      typeof doc.member === 'object' && doc.member !== null
        ? {
            name: doc.member.name,
            email: doc.member.email,
            id: doc.member.id ? String(doc.member.id) : undefined,
            avatar: doc.member.avatar ?? undefined, 
          }
        : String(doc.member),
  }
}


export default async function getClassroomByID({
  id,
}: {
  id: string
}): Promise<Classroom> {
  const payload = await getPayload({ config: configPromise })
  const user = await getUser()

  const classroom = await payload.findByID({
    collection: 'classrooms',
    id,
    overrideAccess: false,
    user,
  })

  const assignments = await payload.find({
    collection: 'assignments',
    where: {
      classroom: { equals: classroom.id },
    },
    overrideAccess: false,
    user,
  })

  const classroomMembers = await payload.find({
    collection: 'classroomMembers',
    where: {
      classroom: { equals: classroom.id },
      status: { equals: 'approved' },
    },
    depth: 2,
    overrideAccess: false,
    user,
  })

  const members = classroomMembers.docs.map(adaptClassroomMember)
  const studentCount = members.filter((m) => m.role === 'student').length

  const classroomData: Classroom = {
    id: String(classroom.id),
    name: classroom.name,
    description: classroom.description || '',
    classCode: classroom.classCode,
    requireApproval: classroom.requireApproval || false,
    createdAt: classroom.createdAt,
    studentCount,
    assignmentCount: assignments.totalDocs || 0,
    members,
    color: getRandomGradient(),
  }

  return classroomData
}
