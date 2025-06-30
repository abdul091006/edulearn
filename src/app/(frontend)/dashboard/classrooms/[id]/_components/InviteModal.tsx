'use client'

import { X, Copy } from 'lucide-react'
import { useState } from 'react'

interface InviteModalProps {
  classCode: string
  onClose: () => void
}

export default function InviteModal({ classCode, onClose }: InviteModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(classCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className="fixed inset-0 h-full bg-black/70 bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm relative shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold mb-4">Class Code</h2>
        <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
          <span className="text-sm font-mono text-gray-700">{classCode}</span>
          <button
            onClick={handleCopy}
            className="ml-2 p-1 text-sm text-gray-600 hover:text-purple-600"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
        {copied && (
          <p className="mt-2 text-sm text-green-600">Copied to clipboard!</p>
        )}
      </div>
    </div>
  )
}
