"use server"
import { getPayload } from "payload"
import configPromise from "@payload-config"

type CreateSubmissionInput = {
  classroom: string
  assignment: string
  student: string
  file: string
  grade?: number
  feedback?: string
  gradedBy?: string
}

export async function createSubmission(input: CreateSubmissionInput) {
  const payload = await getPayload({ config: configPromise })

  try {
    const submission = await payload.create({
      collection: 'submissions',
      data: {
        classroom: Number(input.classroom),
        assignment: Number(input.assignment),
        student: Number(input.student),
        file: Number(input.file),
        grade: input.grade,
        feedback: input.feedback,
        gradedBy: input.gradedBy ? Number(input.gradedBy) : undefined,
      },
    })

    // Update isCompleted in Assignments
    try {
      await payload.update({
        collection: 'assignments',
        id: Number(input.assignment),
        data: {
          isCompleted: true,
        },
      })
      console.log(`Assignment ${input.assignment} marked as completed`)
    } catch (error: any) {
      console.error(`Failed to update isCompleted for assignment ${input.assignment}:`, error.message)
      // Continue to return submission
    }

    return submission
  } catch (error: any) {
    console.error('Failed to create submission:', error.message)
    throw error
  }
}