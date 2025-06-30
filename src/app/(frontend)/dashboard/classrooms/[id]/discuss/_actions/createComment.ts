'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getUser } from '@/app/(frontend)/_actions/getUser'
import { Comment } from '@/payload-types'

interface CreateCommentParams {
  message: string
  parent: string | null
  classroom: string
}

export async function createComment({
  message,
  parent,
  classroom,
}: CreateCommentParams): Promise<Comment> {
  const payload = await getPayload({ config: configPromise })
  const user = await getUser()

  if (!user) {
    throw new Error('Unauthorized: user not found')
  }

  const classroomMember = await payload.find({
    collection: 'classroomMembers',
    where: {
      and: [
        { member: { equals: user.id } },
        { classroom: { equals: classroom } },
        { status: { equals: 'approved' } },
      ],
    },
  })

  const member = classroomMember.docs[0]
  if (!member) {
    throw new Error('User is not a member of the classroom')
  }

  const newComment = await payload.create({
    collection: 'comments',
    data: {
      message,
      parent: parent ? Number(parent) : null,     
      author: member.id,
      classroom: Number(classroom),          
    },
  })

  return newComment
}
