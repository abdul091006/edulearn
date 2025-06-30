import { Dispatch, FormEvent, SetStateAction } from 'react'
import { BookOpen, RefreshCw, Save } from 'lucide-react'
import { updateClassroom } from '../_actions/updateClassroom'
import { NotificationMessage } from './NotificationMessage'
import { useRouter } from 'next/navigation'

interface FormData {
  name: string
  description: string
  classCode: string
  requireApproval: boolean
}

interface Notification {
  type: 'success' | 'error'
  text: string
}

interface BasicInfoSectionProps {
  formData: FormData
  setFormData: Dispatch<SetStateAction<FormData>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  basicInfoMessage: Notification | null
  setBasicInfoMessage: Dispatch<SetStateAction<Notification | null>>
  classroomId: string
}

export function BasicInfoSection({
  formData,
  setFormData,
  isLoading,
  setIsLoading,
  basicInfoMessage,
  setBasicInfoMessage,
  classroomId,
}: BasicInfoSectionProps) {
    const router = useRouter()
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setBasicInfoMessage(null)

    try {
      await updateClassroom(classroomId, {
        name: formData.name,
        description: formData.description,
      })
      setBasicInfoMessage({ type: 'success', text: '✅ Informasi dasar berhasil disimpan.' })
      router.refresh()
    } catch (error: any) {
      setBasicInfoMessage({
        type: 'error',
        text: `❌ ${error.message || 'Gagal menyimpan informasi dasar.'}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-t-2xl border-b border-blue-200/50 p-6">
        <h2 className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center font-semibold">
          <BookOpen className="h-5 w-5 mr-3 text-blue-600" />
          Informasi Dasar
        </h2>
        <p className="text-gray-600 mt-1">Ubah nama dan deskripsi kelas Anda</p>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Nama Kelas
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="description" className="block text-gray-700 font-medium">
              Deskripsi
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center"
          >
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Simpan Perubahan
              </>
            )}
          </button>

          <NotificationMessage message={basicInfoMessage} />
        </form>
      </div>
    </div>
  )
}