import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { Media, Member } from '@/payload-types'
import { User } from 'lucide-react'

interface StudentItemProps {
  student: Member
}

export default function StudentItem({ student }: StudentItemProps) {
  console.log(student)
  return (
    <div className="px-5 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden shadow-xl ring-4 ring-white bg-white">
          {student.avatar ? (
            <img
              src={(student.avatar as Media).url ?? ''}
              alt={student.name ?? 'student Avatar'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
              <User className="w-16 h-16 text-white" />
            </div>
          )}
        </div>
        <div className="ml-4">
          <h4 className="text-sm font-medium text-gray-800">{student.name}</h4>
        </div>
      </div>
      <div className="text-xs text-gray-500">Joined {formatDate(student.createdAt)}</div>
    </div>
  )
}
