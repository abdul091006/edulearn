'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, AlertTriangle, X } from 'lucide-react'
import { deleteClassroomByID } from '../_actions/deleteClassroom'
import { Classroom } from '@/types/classroom'

interface DeleteClassSectionProps {
  classroom: Classroom
  showDeleteModal: boolean
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>
}

export function DeleteClassSection({
  classroom,
  showDeleteModal,
  setShowDeleteModal,
}: DeleteClassSectionProps) {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const deleteClassroom = async () => {
    try {
      await deleteClassroomByID(classroom.id)
      router.push('/dashboard')
    } catch (error: any) {
      // Provide a more specific error message
      const message =
        error?.message?.includes('violates not-null constraint')
          ? 'Gagal menghapus kelas karena masih ada tugas atau pengumpulan terkait. Coba hapus tugas dan pengumpulan terlebih dahulu.'
          : 'Gagal menghapus kelas. Silakan coba lagi atau hubungi dukungan.'
      setErrorMessage(message)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  return (
    <>
      <div className="pt-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Hapus Kelas</h3>
            <p className="text-sm text-gray-500 mt-1">
              Menghapus kelas akan menghapus semua data secara permanen.
            </p>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors duration-200"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Hapus Kelas
          </button>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Konfirmasi Penghapusan</h3>
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Anda akan menghapus kelas{' '}
              <span className="font-semibold text-red-600">"{classroom.name}"</span> secara permanen. 
              Semua data, termasuk{' '}
              <span className="font-semibold">{classroom.members?.length ?? 0} anggota</span>, tugas, dan materi, 
              akan hilang dan tidak dapat dikembalikan.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
              >
                Batal
              </button>
              <button
                onClick={deleteClassroom}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
              >
                Hapus Kelas
              </button>
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center text-sm animate-slide-in">
          <AlertTriangle className="h-4 w-4 mr-2" />
          {errorMessage}
        </div>
      )}
    </>
  )
}