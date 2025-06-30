export interface Grade {
  id: string
  assignment: string
  className: string
  studentName: string
  classId: string
  dueDate: string
  submittedDate: string
  score: number
  totalPoints: number
  feedback?: string
}
