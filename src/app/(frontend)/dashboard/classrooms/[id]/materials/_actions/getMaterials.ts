import { Material } from '@/types/material'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getMaterials(classroomId: string): Promise<Material[]> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'materials',
    where: {
      classroom: {
        equals: classroomId,
      },
    },
    depth: 2,
    sort: '-createdAt',
  })

  return result.docs.map((doc) => ({
    id: String(doc.id),
    title: doc.title,
    content: doc.content ?? undefined,
    file: doc.file ?? undefined,
    classroom:
      typeof doc.classroom === 'object' && doc.classroom !== null
        ? String(doc.classroom.id)
        : String(doc.classroom),
    createdBy:
      typeof doc.createdBy === 'object' && doc.createdBy !== null
        ? (doc.createdBy.name ?? 'Unknown')
        : 'Unknown',
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }))
}
