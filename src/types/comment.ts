import { Classroom } from './classroom'
import { Assignment } from './assignment'
import { Material } from './material'
import { ClassroomMember } from './classroomMember'

export interface Comment {
  id: string
  message: string
  author: ClassroomMember
  classroom: Classroom
  assignment?: Assignment
  material?: Material
  parent?: Comment
  createdAt: string
}
