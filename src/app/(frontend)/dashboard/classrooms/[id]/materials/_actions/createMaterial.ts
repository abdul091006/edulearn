'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

interface CreateMaterialInput {
  title: string
  content: string
  classroom: string
  createdBy: string
  file: string
}

export async function createMaterial(input: CreateMaterialInput) {
  const payload = await getPayload({ config: configPromise })

  try {
    const material = await payload.create({
      collection: 'materials',
      data: {
        title: input.title,
        content: input.content,
        classroom: Number(input.classroom),
        createdBy: Number(input.createdBy),
        file: Number(input.file),
      },
    })

    return { success: true, data: material }
  } catch (err: any) {
    console.error(err)
    return { success: false, error: err.message }
  }
}
