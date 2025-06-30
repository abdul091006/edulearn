'use client'

import { useState, useTransition } from "react"
import { X } from "lucide-react"
import { joinClass } from "../_actions/joinClass"

interface JoinClassModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function JoinClassModal({ isOpen, onClose }: JoinClassModalProps) {
  const [classCode, setClassCode] = useState("")
  const [message, setMessage] = useState("")
  const [isPending, startTransition] = useTransition()

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    startTransition(async () => {
      const result = await joinClass(classCode)
      setMessage(result.message)
      if (result.success) {
        setClassCode("")
        setTimeout(() => {
          setMessage("")
          onClose()
        }, 3000)
      }
    })
    window.location.reload()
  }

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Join a Class</h2>
        <p className="text-gray-600 mb-6">Enter the class code provided by your teacher to join a class.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="classCode" className="block text-sm font-medium text-gray-700 mb-1">
              Class Code
            </label>
            <input
              type="text"
              id="classCode"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              placeholder="Enter class code (e.g., abc123)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {message && <p className="text-sm text-center mb-3 text-blue-600">{message}</p>}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md mr-2 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-md hover:from-purple-700 hover:to-blue-600"
            >
              {isPending ? 'Joining...' : 'Join Class'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
