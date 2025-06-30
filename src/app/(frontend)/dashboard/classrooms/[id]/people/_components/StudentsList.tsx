import { Member } from "@/payload-types"
import StudentItem from "./StudentItem"

interface StudentsListProps {
  students: Member[]
}

export default function StudentsList({ students }: StudentsListProps) {
  return (
    <>
      <div className="px-5 py-4 border-t border-b border-gray-200">
        <h3 className="text-base font-semibold text-gray-800">Students ({students.length})</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {students.map((student) => (
          <StudentItem key={student.id} student={student} />
        ))}
      </div>
    </>
  )
}
