'use server'
import { Material } from '@/types/material'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getMaterialById(id: string): Promise<Material | null> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.findByID({
    collection: 'materials',
    id,
    depth: 2,
  })

  if (!result) return null

  return {
    id: String(result.id),
    title: result.title,
    content: result.content ?? undefined,
    file: result.file ?? undefined,
    createdBy:
      typeof result.createdBy === 'object' && result.createdBy !== null
        ? (result.createdBy.name ?? 'Unknown')
        : 'Unknown',
    classroom:
      typeof result.classroom === 'object' && result.classroom !== null
        ? String(result.classroom.id)
        : String(result.classroom),

    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  }
}
