'use client'

import { BookOpen, Plus, Search, RefreshCw } from "lucide-react"

export default function EmptyMaterials() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-12 text-center">
      <div className="max-w-md mx-auto">
        {/* Ilustrasi */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full mx-auto flex items-center justify-center shadow-lg">
            <BookOpen className="h-16 w-16 text-purple-600" />
          </div>
          <div className="absolute top-0 right-1/3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-md animate-bounce">
            <Search className="h-5 w-5 text-white" />
          </div>
          <div className="absolute bottom-0 left-1/3 w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center shadow-md animate-pulse">
            <Plus className="h-5 w-5 text-white" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-purple-900 mb-3">No Materials Found</h3>
        <p className="text-purple-600 mb-8">
          You don't have any learning materials yet, or they don't match your current filters. Try adjusting your search
          criteria or check back later.
        </p>
      </div>
    </div>
  )
}
