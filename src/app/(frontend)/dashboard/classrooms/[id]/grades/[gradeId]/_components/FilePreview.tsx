'use client'

import { Media } from "@/types/media"
import { useCallback, useState } from "react"
import { Download } from "lucide-react"

interface FilePreviewProps {
  file: Media
}

export function FilePreview({ file }: FilePreviewProps) {
  const [previewError, setPreviewError] = useState<string | null>(null)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return { icon: "🖼️", color: "from-green-400 to-emerald-500" }
    if (type.startsWith("video/")) return { icon: "🎥", color: "from-red-400 to-rose-500" }
    if (type.startsWith("audio/")) return { icon: "🎵", color: "from-purple-400 to-violet-500" }
    if (type.includes("pdf")) return { icon: "📄", color: "from-red-500 to-red-600" }
    if (type.includes("word")) return { icon: "📝", color: "from-blue-500 to-blue-600" }
    if (type.includes("excel") || type.includes("spreadsheet"))
      return { icon: "📊", color: "from-green-500 to-green-600" }
    if (type.includes("powerpoint") || type.includes("presentation"))
      return { icon: "📽️", color: "from-orange-500 to-orange-600" }
    return { icon: "📁", color: "from-slate-400 to-slate-500" }
  }

  const getFileUrl = () => {
    if (!file?.url && !file?.filename) {
      console.warn("No file URL or filename provided:", file)
      return ""
    }
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    const url = file.url?.startsWith("http") ? file.url : `${baseUrl}${file.url}`
    console.log("Generated file URL:", url)
    return url
  }

  const fileInfo = getFileIcon(file.mimeType ?? "")
  const fileUrl = getFileUrl()

  const handleDownload = useCallback(async () => {
    try {
      console.log("Attempting to download file from:", fileUrl)
      const response = await fetch(fileUrl)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Fetch error:", response.status, errorText)
        throw new Error(`Gagal mengambil file: ${response.status} ${response.statusText}`)
      }

      const blob = await response.blob()

      if (blob.type.includes("application/json")) {
        const text = await blob.text()
        console.error("Unexpected JSON response:", text)
        setPreviewError("File tidak tersedia: Respons server tidak valid.")
        return
      }

      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = file.filename || "downloaded_file"
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (err: any) {
      console.error("Download error:", err)
      setPreviewError(`Terjadi kesalahan saat mendownload file: ${err.message}`)
    }
  }, [fileUrl, file.filename])

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-slate-800">File Submission</h2>
          <p className="text-slate-500 text-sm">File yang disubmit oleh siswa</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 rounded-2xl p-6 border-2 border-slate-100 hover:border-blue-200 transition-all duration-300 shadow-inner">
        <div className="flex items-center space-x-6">
          <div
            className={`w-20 h-20 bg-gradient-to-br ${fileInfo.color} rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200`}
          >
            <span className="text-3xl">{fileInfo.icon}</span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-800 text-xl mb-2 truncate">{file.filename}</h3>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold border border-blue-200">
                {file.mimeType?.split("/")[1]?.toUpperCase() || "FILE"}
              </span>
              <span className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold border border-emerald-200">
                {formatFileSize(file.filesize ?? 0)}
              </span>
            </div>
            <div className="text-sm text-slate-600">
              Upload:{" "}
              {new Date(file.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            {fileUrl && (
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                👁️ Lihat File
              </a>
            )}
            <button
              onClick={handleDownload}
              className="bg-white text-slate-700 px-6 py-3 rounded-xl font-semibold border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Download
            </button>
          </div>
        </div>
        {fileUrl && file.mimeType === "application/pdf" ? (
          previewError ? (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-900 mb-2">File Preview</p>
              <div className="w-full h-64 border border-gray-200 rounded-md flex items-center justify-center bg-gray-50">
                <p className="text-red-600 text-sm">{previewError}</p>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-900 mb-2">File Preview</p>
              <iframe
                src={fileUrl}
                className="w-full h-64 border border-gray-200 rounded-md min-h-[500px]"
                title="File Preview"
                onError={() => setPreviewError("Gagal memuat preview: Tidak dapat memuat file PDF")}
              />
            </div>
          )
        ) : (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-900 mb-2">File Preview</p>
            <div className="w-full h-64 border border-gray-200 rounded-md flex items-center justify-center bg-gray-50">
              <p className="text-gray-600 text-sm">Preview tidak tersedia untuk tipe file ini</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}