import { Media } from "@/payload-types"
import { User } from "lucide-react"

interface TeacherSectionProps {
  teacher: string
  user: any
}

export default function TeacherSection({ teacher, user }: TeacherSectionProps) {
  return (
    <>
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-base font-semibold text-gray-800">Teacher</h3>
      </div>
      <div className="p-5">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-xl ring-4 ring-white bg-white">
            {user.avatar ? (
              <img
                src={(user.avatar as Media).url ?? ''}
                alt={user.name ?? 'user Avatar'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <User className="w-16 h-16 text-white" />
              </div>
            )}
          </div>
          <div className="ml-4">
            <h4 className="text-sm font-medium text-gray-800">{teacher}</h4>
          </div>
        </div>
      </div>
    </>
  )
}
