'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, FileText, User, X, Download } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { Material } from '@/types/material'
import { Media } from '@/payload-types'

interface MaterialDetailProps {
  material: Material | null
}

export default function MaterialDetail({ material }: MaterialDetailProps) {
  const [showPreview, setShowPreview] = useState(false)

  if (!material) {
    return <div>Material tidak ditemukan.</div>
  }

  const file = material.file as Media | undefined

  return (
    <>
      <div className="space-y-6">
        {/* Back Button */}
        <Link
          href="/dashboard/materials"
          className="inline-flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Back to materials</span>
        </Link>

        {/* Material Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="h-1 w-full bg-indigo-500" />

          <div className="p-6">
            {/* Header */}
            <div className="flex items-start space-x-4 mb-6">
              <div className="p-3 bg-gray-100 rounded-lg">
                <FileText className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 mb-1">{material.title}</h1>
                <p className="text-sm text-gray-600">by {material.createdBy}</p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Created At</p>
                  <p className="font-medium text-gray-900">{formatDate(material.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Updated At</p>
                  <p className="font-medium text-gray-900">{formatDate(material.updatedAt)}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            {material.content && (
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-2">Material Content</h2>
                <div className="bg-gray-50 rounded-lg border border-gray-100 p-4">
                  <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                    {typeof material.content === 'string'
                      ? material.content
                      : '[Invalid content format]'}
                  </p>
                </div>
              </div>
            )}

            {/* File */}
            {file && file.url && (
              <div className="mt-6">
                <h2 className="text-base font-semibold text-gray-900 mb-2">Attached File</h2>
                <div
                  onClick={() => setShowPreview(true)}
                  className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition"
                >
                  <div className="p-2 bg-indigo-100 rounded-md mr-3">
                    <FileText className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{file.filename ?? 'File'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Preview */}
      {showPreview && file && file.url && (
        <div className="fixed inset-0 z-50 bg-black/70 bg-opacity-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] p-4 overflow-auto">
            {/* Close button */}
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Download button */}
            <a
              href={file.url}
              download={file.filename ?? 'file'}
              className="absolute top-2 right-12 text-gray-500 hover:text-indigo-600"
              title="Download file"
            >
              <Download className="w-5 h-5" />
            </a>

            <h3 className="text-lg font-semibold mb-4">{file.filename ?? 'File'}</h3>

            {file.url.endsWith('.pdf') ? (
              <iframe
                src={file.url}
                className="w-full h-[70vh] rounded"
              />
            ) : (
              <img
                src={file.url}
                alt={file.filename ?? 'file preview'}
                className="max-w-full max-h-[70vh] object-contain mx-auto"
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}
