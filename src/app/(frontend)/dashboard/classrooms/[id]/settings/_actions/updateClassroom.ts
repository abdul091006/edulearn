'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function updateClassroom(id: string, formData: any) {
  const payload = await getPayload({ config: configPromise })

  // Validasi classCode hanya jika dikirim
  if (formData.classCode && formData.classCode.trim().length < 6) {
    throw new Error('Kode kelas minimal 6 karakter')
  }

  try {
    const updated = await payload.update({
      collection: 'classrooms',
      id,
      data: {
        ...(formData.name && { name: formData.name }),
        ...(formData.description && { description: formData.description }),
        ...(formData.classCode && { classCode: formData.classCode }),
        ...(formData.requireApproval !== undefined && { requireApproval: formData.requireApproval }),
      },
    })
    return updated
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Gagal memperbarui kelas: ${error.message}`)
    }
    throw new Error('Gagal memperbarui kelas: Kesalahan tidak diketahui')
  }
}