import { BookOpen, Plus } from "lucide-react"
import ClassroomsSearch from "./ClassroomsSearch"
import { useRoleFilter } from "@/context/RoleFilterContext" // Import context

interface ClassroomsHeaderProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  onToggleSort: () => void
  onJoinClick: () => void
}

export default function ClassroomsHeader({
  searchTerm,
  setSearchTerm,
  onToggleSort,
  onJoinClick,
}: ClassroomsHeaderProps) {
  const { role } = useRoleFilter() 
  return (
    <div className="flex flex-col items-end justify-between gap-4 mb-4">
      <div className="flex items-center gap-3 w-max">
        <ClassroomsSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onToggleSort={onToggleSort}
        />

        <button
          onClick={onJoinClick}
          className="px-4 py-6 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg text-sm font-medium text-white hover:from-purple-700 hover:to-blue-600 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          {role === "teacher" ? "Create Class" : "Join Class"}
        </button>
      </div>
    </div>
  )
}
