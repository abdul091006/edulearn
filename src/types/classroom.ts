import { ClassroomMember } from "./classroomMember"

export interface Classroom {
  id: string
  name: string
  description: string
  teacher?: string
  studentCount?: number
  assignmentCount?: number
  classCode: string
  requireApproval?: boolean
  color?: string
  createdAt: string
  members?: ClassroomMember[]
}
