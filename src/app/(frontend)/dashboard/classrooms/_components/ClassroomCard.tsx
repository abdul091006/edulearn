import Link from "next/link"
import { Users } from "lucide-react"
import type { Classroom } from "@/types/classroom"

interface ClassroomCardProps {
  classroom: Classroom
}

export default function ClassroomCard({ classroom }: ClassroomCardProps) {
  return (
    <Link
      key={classroom.id}
      href={`/dashboard/classrooms/${classroom.id}/discuss`}
      className="block group"
    >
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
        {/* Bar warna di atas */}
        <div className="h-3" style={{ background: classroom.color }}></div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
              {classroom.name}
            </h3>
          </div>
          <p className="text-sm text-gray-500 mt-2 mb-4 line-clamp-2">
            {classroom.description}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-medium">Teacher:</span>{" "}
            {classroom.teacher ?? "-"}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              {classroom.studentCount ?? 0} students
            </div>
            <div className="text-sm text-gray-500">
              {classroom.assignmentCount ?? 0} assignments
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
