export interface ClassroomMember {
  id: string
  role: 'teacher' | 'student'
  status: 'approved' | 'pending' | 'rejected'
  member: {
    name: string
    email?: string
    id?: string
    avatar?: any
  } | string
}
