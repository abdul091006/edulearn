import { Media } from "./media"

export interface Submission {
  id: string
  classroom: string
  assignment: string
  student: string 
  file?: Media
  grade?: number
  feedback?: string
  gradedBy?: string 
  gradedAt?: string
  createdAt: string
  updatedAt: string
}
