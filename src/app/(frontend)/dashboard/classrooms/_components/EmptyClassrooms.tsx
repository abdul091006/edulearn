"use client"

import { Users } from "lucide-react"

interface EmptyClassroomsProps {
  onJoinClass: () => void
}

export default function EmptyClassrooms({ onJoinClass }: EmptyClassroomsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-purple-100 p-4 rounded-full mb-4">
        <Users className="h-10 w-10 text-purple-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">No Classes Yet</h3>
      <p className="text-gray-600 max-w-md mb-6">
        You haven't joined any classes yet. Join a class to start learning and accessing course materials.
      </p>
      <button
        onClick={onJoinClass}
        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg text-sm font-medium text-white hover:from-purple-700 hover:to-blue-600"
      >
        Join a Class
      </button>
    </div>
  )
}
