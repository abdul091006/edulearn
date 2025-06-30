'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Assignment } from '@/payload-types'

interface CreateAssignmentParams {
  title: string
  description?: string
  dueDate: string
  classroom: number
  createdBy: number
}

export const createAssignment = async ({
  title,
  description,
  dueDate,
  classroom,
  createdBy,
}: CreateAssignmentParams): Promise<Assignment> => {
  const payload = await getPayload({ config: configPromise })

  try {
    const relasi = await payload.find({
      collection: 'classroomMembers',
      where: {
        member: {
          equals: createdBy,
        },
        classroom: {
          equals: classroom,
        },
        role: {
          equals: 'teacher',
        },
        status: {
          equals: 'approved',
        },
      },
      limit: 1,
    })

    if (relasi.totalDocs === 0) {
      throw new Error('User bukan teacher di classroom ini.')
    }

    const newAssignment = await payload.create({
      collection: 'assignments',
      data: {
        title,
        description,
        dueDate,
        classroom,
        createdBy,
        isCompleted: false,
      },
    })

    return newAssignment as Assignment
  } catch (error) {
    throw new Error(`Gagal membuat assignment: ${(error as Error).message}`)
  }
}
