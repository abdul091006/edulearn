"use server"
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Submission } from '@/types/submission'

export async function getSubmissionByID(id: string): Promise<Submission> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.findByID({
    collection: 'submissions',
    id,
    depth: 2,
  })

  const formattedResult: Submission = mapToSubmission(result)

  return formattedResult
}

// Map helper kayak di getSubmissions
function mapToSubmission(doc: any): Submission {
  return {
    id: String(doc.id),
    classroom: typeof doc.classroom === 'string' ? doc.classroom : doc.classroom?.name,
    assignment: typeof doc.assignment === 'string' ? doc.assignment : doc.assignment?.title,
    student: typeof doc.student === 'string' ? doc.student : doc.student?.name,
    file: doc.file ?? undefined,
    grade: doc.grade ?? undefined,
    feedback: doc.feedback ?? undefined,
    gradedBy: typeof doc.gradedBy === 'string' ? doc.gradedBy : doc.gradedBy?.name,
    gradedAt: doc.gradedAt ?? undefined,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }
}
