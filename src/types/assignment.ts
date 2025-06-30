import { Classroom } from "./classroom"

export interface Assignment {
  id: string
  title: string
  description: string
  dueDate: string
  daysLeft: number
  classroom: Classroom
  status: "In Progress" | "Done" | "OverDue"
}
