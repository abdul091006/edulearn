'use client'

import Link from 'next/link'
import { FileText, Calendar, User, ChevronRight, Plus, Search } from 'lucide-react'
import { useState, useMemo } from 'react'
import { Material } from '@/types/material'
import { formatDate } from '@/lib/utils'
import { useRoleFilter } from '@/context/RoleFilterContext'
import CreateMaterialModal from '@/app/(frontend)/dashboard/classrooms/[id]/materials/_components/CreateMaterialModal'
import EmptyMaterials from './EmptyMaterials'

interface MaterialsTabProps {
  materials: Material[]
  user: any
  classroomId: string
}

export default function MaterialTab({ materials, user, classroomId }: MaterialsTabProps) {
  const { role } = useRoleFilter()
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [materialList, setMaterialList] = useState<Material[]>(materials)

  const filteredMaterials = useMemo(() => {
    return materialList.filter((material) =>
      material.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery, materialList])

  return (
    <div className="space-y-4 mt-4">
      {/* Judul kiri - Filter kanan */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h2 className="text-lg font-semibold text-gray-800">Assignments</h2>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search materials..."
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {role === 'teacher' && (
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md whitespace-nowrap"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Material
            </button>
          )}
        </div>
      </div>

      {/* Material List */}
      {filteredMaterials.length === 0 ? (
        <EmptyMaterials />
      ) : (
        filteredMaterials.map((material) => (
          <Link
            key={material.id}
            href={`/dashboard/classrooms/${classroomId}/materials/${material.id}`}
            className="block transition-colors"
          >
            <div className="px-5 py-4 bg-blue-50/70 hover:bg-blue-50 border-l-4 border-blue-500 transition-all duration-200">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                <div className="flex items-start flex-1">
                  <div className="p-2 rounded-lg bg-blue-100 mr-4 flex-shrink-0">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-medium text-gray-900 line-clamp-1 pr-2">
                      {material.title}
                    </h4>

                    <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
                      <div className="flex items-center">
                        <User className="h-3.5 w-3.5 mr-1.5" />
                        <span>{String(material.createdBy)}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                        <span>Dibuat: {formatDate(material.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 sm:mt-0 sm:ml-4 flex items-center">
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </Link>
        ))
      )}

      {/* Modal */}
      {showModal && user && (
        <CreateMaterialModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          classroomId={classroomId}
          createdById={user.id}
          onSuccess={(newMaterial) => {
            setMaterialList((prev) => [newMaterial, ...prev])
            setShowModal(false)
          }}
        />
      )}
    </div>
  )
}
