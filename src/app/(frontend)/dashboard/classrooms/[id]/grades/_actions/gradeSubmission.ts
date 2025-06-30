'use server'

import { getPayload } from "payload"
import configPromise from "@payload-config"
import { getUser } from "@/app/(frontend)/_actions/getUser"

export async function gradeSubmission({
  submissionId,
  grade,
  feedback,
}: {
  submissionId: string
  grade: number
  feedback?: string
}) {
    const payload = await getPayload({ config: configPromise })

    const user = await getUser()
  try {
    const updated = await payload.update({
      collection: 'submissions',
      id: submissionId,
      data: {
        grade,
        feedback,
        gradedBy: user.id,
        gradedAt: new Date().toISOString(),
      },
    })

    return { success: true, data: updated }
  } catch (err) {
    console.error(err)
    return { success: false, message: 'Gagal memberi nilai' }
  }
}
