import Link from "next/link"
import { Users } from "lucide-react"
import type { Classroom } from "@/types/classroom"

interface ClassroomCardProps {
  classroom: Classroom
}

export default function ClassroomCard({ classroom }: ClassroomCardProps) {
  return (
    <Link href={`/dashboard/classrooms/${classroom.id}`} className="block group">
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="h-3"
          style={{ background: classroom.color }}></div>
        <div className="p-4 flex-1 flex flex-col">
          <h4 className="text-base font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
            {classroom.name}
          </h4>
          <p className="text-sm text-gray-500 mt-1 mb-3 line-clamp-2">{classroom.description}</p>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center text-xs text-gray-500">
              <Users className="h-3 w-3 mr-1" />
              {classroom.studentCount} students
            </div>
            <div className="text-xs text-gray-500">{classroom.assignmentCount} assignments</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
