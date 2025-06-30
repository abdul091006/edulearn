import type { Classroom } from "@/types/classroom"
import ClassroomCard from "./ClassroomCard"

interface ClassroomsListProps {
  classrooms: Classroom[]
}


export default function ClassroomsList({ classrooms }: ClassroomsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {classrooms.map((classroom) => (
        <ClassroomCard key={classroom.id} classroom={classroom} />
      ))}
    </div>
  )
}
