'use client'

import { useState, useTransition } from 'react'
import { createClassroom } from '../_actions/createClassroom'

type CreateClassModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function CreateClassModal({ isOpen, onClose }: CreateClassModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [classCode, setClassCode] = useState('')
  const [requireApproval, setRequireApproval] = useState(true)

  const [errors, setErrors] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([]) // Reset error messages before submission

    // Validate classCode
    const newErrors: string[] = []
    if (classCode.length < 6) {
      newErrors.push('Class Code must be at least 6 characters long.')
    }

    // If there are validation errors, set them and stop submission
    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    startTransition(async () => {
      try {
        await createClassroom({
          name,
          description,
          classCode,
          requireApproval,
        })
        onClose()
        setName('')
        setDescription('')
        setClassCode('')
        setRequireApproval(true)
        window.location.reload()
      } catch (error: any) {
        const errorMessages: string[] = []

        if (error?.response?.data?.errors) {
          const errs = error.response.data.errors
          for (const field in errs) {
            if (errs[field].length > 0) {
              const messages = errs[field].join(', ')
              if (field === 'classCode') {
                errorMessages.push(`Class Code error: ${messages}`)
              } else if (field === 'name') {
                errorMessages.push(`Name error: ${messages}`)
              } else {
                errorMessages.push(`${field} error: ${messages}`)
              }
            }
          }
        } else if (error?.message) {
          errorMessages.push(error.message)
        } else {
          errorMessages.push('Failed to create class. Please try again.')
        }

        setErrors(errorMessages)
      }
    })
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">Create a New Class</h2>

        {/* Display error messages */}
        {errors.length > 0 && (
          <div className="mb-4 rounded border border-red-500 bg-red-100 p-3 text-red-700">
            <ul className="list-disc list-inside space-y-1">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1" htmlFor="name">
              Class Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter class name"
            />
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Short description"
            />
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="classCode">
              Class Code <span className="text-red-500">*</span>
            </label>
            <input
              id="classCode"
              type="text"
              required
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Unique class code (min 6 characters)"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="requireApproval"
              type="checkbox"
              checked={requireApproval}
              onChange={(e) => setRequireApproval(e.target.checked)}
            />
            <label htmlFor="requireApproval" className="text-sm">
              Require approval to join class
            </label>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300"
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {isPending ? 'Creating...' : 'Create Class'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}