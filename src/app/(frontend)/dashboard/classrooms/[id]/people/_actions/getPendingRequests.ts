'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getUser } from '@/app/(frontend)/_actions/getUser'
import { Member } from '@/payload-types'

export async function getPendingRequests(classroomId: string): Promise<Member[]> {
  const payload = await getPayload({ config: configPromise })
  const user = await getUser()

  if (!user || !user.id) return []

  const isTeacher = await payload.find({
    collection: 'classroomMembers',
    where: {
      member: { equals: user.id },
      classroom: { equals: classroomId },
      role: { equals: 'teacher' },
    },
    limit: 1,
  })

  if (isTeacher.totalDocs === 0) return []

  const result = await payload.find({
    collection: 'classroomMembers',
    where: {
      classroom: { equals: classroomId },
      status: { equals: 'pending' },
      role: { equals: 'student' },
    },
    depth: 2,
  })

  // Convert ClassroomMember[] => Member[]
  const pendingMembers: Member[] = result.docs
    .filter((m) => typeof m.member === 'object' && m.member !== null)
    .map((m: any) => ({
      id: m.member.id,
      name: m.member.name,
      email: m.member.email ?? '',
      createdAt: typeof m.member.createdAt === 'string' ? m.member.createdAt : new Date().toISOString(),
      updatedAt: '',
      avatar: m.member.avatar ?? undefined,
    }))

  return pendingMembers
}
