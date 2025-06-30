"use client"

import { Search, ArrowUpDown } from "lucide-react"

interface ClassroomsSearchProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  onToggleSort: () => void
}

export default function ClassroomsSearch({
  searchTerm,
  setSearchTerm,
  onToggleSort,
}: ClassroomsSearchProps) {

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search classrooms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleSort}
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Sort
          </button>
        </div>
      </div>
    </div>
  )
}
