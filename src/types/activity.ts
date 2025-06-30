import type { ElementType } from "react"

export interface ActivityItem {
  id: string
  type: "submission" | "comment" | "join" | "assignment"
  title: string
  user: string
  time: string
  icon: ElementType
  iconColor: string
  bgColor: string
}
