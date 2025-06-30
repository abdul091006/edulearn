import { Dispatch, SetStateAction } from 'react'
import { Code, Copy, RefreshCw, Save } from 'lucide-react'
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

interface ClassCodeSectionProps {
  formData: FormData
  setFormData: Dispatch<SetStateAction<FormData>>
  isLoadingClassCode: boolean
  setIsLoadingClassCode: Dispatch<SetStateAction<boolean>>
  classCodeMessage: Notification | null
  setClassCodeMessage: Dispatch<SetStateAction<Notification | null>>
  classroomId: string
}

export function ClassCodeSection({
  formData,
  setFormData,
  isLoadingClassCode,
  setIsLoadingClassCode,
  classCodeMessage,
  setClassCodeMessage,
  classroomId,
}: ClassCodeSectionProps) {
  const router = useRouter()
  const handleSaveClassCode = async () => {
    setIsLoadingClassCode(true)
    setClassCodeMessage(null)

    try {
      await updateClassroom(classroomId, { classCode: formData.classCode })
      setClassCodeMessage({ type: 'success', text: '✅ Kode kelas berhasil diperbarui.' })
      router.refresh()
    } catch (error: any) {
      setClassCodeMessage({
        type: 'error',
        text: `❌ ${error.message || 'Gagal memperbarui kode kelas.'}`,
      })
    } finally {
      setIsLoadingClassCode(false)
    }
  }

  const copyClassCode = async () => {
    try {
      await navigator.clipboard.writeText(formData.classCode)
      setClassCodeMessage({ type: 'success', text: '✅ Kode kelas berhasil disalin.' })
    } catch (error) {
      setClassCodeMessage({ type: 'error', text: '❌ Gagal menyalin kode kelas.' })
    }
  }

  return (
    <div className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-t-2xl border-b border-purple-200/50 p-6">
        <h2 className="text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center font-semibold">
          <Code className="h-5 w-5 mr-3 text-purple-600" />
          Kode Kelas
        </h2>
        <p className="text-gray-600 mt-1">Kelola kode unik untuk siswa bergabung</p>
      </div>
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <label className="block text-gray-700 font-medium">Kode Kelas Saat Ini</label>
          <div className="flex items-center space-x-4">
            <input
              id="classCode"
              type="text"
              value={formData.classCode}
              onChange={(e) => setFormData((prev) => ({ ...prev, classCode: e.target.value }))}
              required
              className="text-xl font-mono px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 border-2 border-blue-200/50 hover:border-purple-300/50 rounded-xl"
            />
            <button
              onClick={copyClassCode}
              type="button"
              className="p-3 border-2 border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 rounded-xl"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        <button
          onClick={handleSaveClassCode}
          disabled={isLoadingClassCode}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center"
        >
          {isLoadingClassCode ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Simpan Perubahan Kode
            </>
          )}
        </button>

        <NotificationMessage message={classCodeMessage} />
      </div>
    </div>
  )
}
