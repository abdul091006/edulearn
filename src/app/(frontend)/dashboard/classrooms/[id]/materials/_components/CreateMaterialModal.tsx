'use client'

import { useState, useRef } from 'react'
import { createMaterial } from '../_actions/createMaterial'
import { Material } from '@/types/material'

interface CreateMaterialModalProps {
  isOpen: boolean
  onClose: () => void
  classroomId: string
  createdById: string
  onSuccess: (material: Material) => void
}

export default function CreateMaterialModal({
  isOpen,
  onClose,
  classroomId,
  createdById,
  onSuccess,
}: CreateMaterialModalProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleSubmit = async () => {
    if (!title || !content || !file) {
      setError('Semua field wajib diisi.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('_payload', JSON.stringify({ alt: file.name }))

      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })

      if (!res.ok) throw new Error('Gagal mengunggah file.')

      const data = await res.json()
      const fileId = data?.doc?.id
      if (!fileId) throw new Error('ID file tidak ditemukan.')

      const result = await createMaterial({
        title,
        content,
        classroom: classroomId,
        createdBy: createdById,
        file: fileId,
      })

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Gagal menyimpan materi.')
      }

      const newMaterial: Material = {
        id: String(result.data.id),
        title: result.data.title,
        content: result.data.content ?? '',
        createdAt: result.data.createdAt,
        updatedAt: result.data.updatedAt ?? result.data.createdAt,
        createdBy: String(result.data.createdBy),
        classroom: String(result.data.classroom),
        file: result.data.file ?? undefined,
      }

      onSuccess(newMaterial)

      setTitle('')
      setContent('')
      setFile(null)
      onClose()
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Buat Materi Baru</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Konten <span className="text-red-500">*</span></label>
            <textarea
              className="mt-1 w-full border rounded-md px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => fileInputRef.current?.click()}
              >
                Pilih File
              </button>
              <span className="text-sm text-gray-600">
                {file ? file.name : 'Belum ada file yang dipilih'}
              </span>
            </div>
            <input
              type="file"
              accept="application/pdf"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md"
            disabled={loading}
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md"
            disabled={loading}
          >
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  )
}
