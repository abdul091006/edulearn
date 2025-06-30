"use client"

import { X, Reply } from "lucide-react"
import type { Comment } from "@/payload-types"

interface ReplyBannerProps {
  onCancel: () => void
  replyTo?: Comment
}

export default function ReplyBanner({ onCancel, replyTo }: ReplyBannerProps) {
  const replyMessage = replyTo?.message || "Pesan tidak tersedia"
  const replyAuthor = replyTo?.author
    ? (replyTo.author as any)?.member?.name || "Pengguna tidak diketahui"
    : "Pengguna tidak diketahui"

  return (
    <div className="px-4 py-2 bg-blue-50 border-t border-blue-100 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm text-blue-700 bg-white p-2 rounded-lg shadow-sm">
        <Reply className="w-4 h-4" />
        <div>
          <p className="font-medium text-gray-800">{replyAuthor}</p>
          <p className="text-gray-600 truncate max-w-[200px]">{replyMessage}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-blue-700">Membalas pesan</span>
        <button
          onClick={onCancel}
          className="p-1 hover:bg-blue-100 rounded-full transition-colors duration-200 text-blue-600"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}