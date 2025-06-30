import { Dispatch, SetStateAction } from 'react'
import { Shield } from 'lucide-react'
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

interface JoinSettingsSectionProps {
  formData: FormData
  setFormData: Dispatch<SetStateAction<FormData>>
  isLoadingApproval: boolean
  setIsLoadingApproval: Dispatch<SetStateAction<boolean>>
  approvalMessage: Notification | null
  setApprovalMessage: Dispatch<SetStateAction<Notification | null>>
  classroomId: string
}

export function JoinSettingsSection({
  formData,
  setFormData,
  isLoadingApproval,
  setIsLoadingApproval,
  approvalMessage,
  setApprovalMessage,
  classroomId,
}: JoinSettingsSectionProps) {
  const router = useRouter()
  const handleToggleApproval = async () => {
    const newRequireApproval = !formData.requireApproval
    setIsLoadingApproval(true)
    setApprovalMessage(null)

    try {
      await updateClassroom(classroomId, { requireApproval: newRequireApproval })
      setFormData((prev) => ({ ...prev, requireApproval: newRequireApproval }))
      setApprovalMessage({ type: 'success', text: '✅ Pengaturan persetujuan berhasil diperbarui.' })
      router.refresh()
    } catch (error: any) {
      setApprovalMessage({
        type: 'error',
        text: `❌ ${error.message || 'Gagal memperbarui pengaturan persetujuan.'}`,
      })
    } finally {
      setIsLoadingApproval(false)
    }
  }

  return (
    <div className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-t-2xl border-b border-green-200/50 p-6">
        <h2 className="text-xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent flex items-center font-semibold">
          <Shield className="h-5 w-5 mr-3 text-green-600" />
          Pengaturan Bergabung
        </h2>
        <p className="text-gray-600 mt-1">Atur cara siswa masuk ke kelas</p>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200/50">
          <div className="space-y-1">
            <label className="text-gray-800 font-medium">🔒 Perlu Persetujuan</label>
            <div className="text-sm text-gray-600">
              Setiap permintaan bergabung harus disetujui terlebih dahulu
            </div>
          </div>
          <button
            onClick={handleToggleApproval}
            disabled={isLoadingApproval}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData.requireApproval
                ? 'bg-gradient-to-r from-green-500 to-blue-500'
                : 'bg-gray-200'
            } ${isLoadingApproval ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.requireApproval ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        {isLoadingApproval && (
          <div className="mt-4 px-4 py-3 rounded-xl text-sm bg-blue-100 text-blue-700 border border-blue-200">
            Memproses...
          </div>
        )}
        <NotificationMessage message={approvalMessage} />
      </div>
    </div>
  )
}