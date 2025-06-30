'use client'

import { useState } from 'react'
import { createAssignment } from '@/app/(frontend)/dashboard/classrooms/[id]/assignments/_actions/createAssignment'

interface CreateAssignmentModalProps {
  isOpen: boolean
  onClose: () => void
  classroomId: number
  createdBy: number
}

export function CreateAssignmentModal({
  isOpen,
  onClose,
  classroomId,
  createdBy,
}: CreateAssignmentModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = async () => {
    if (!title || !dueDate) {
      alert('Title and due date are required')
      return
    }

    try {
      await createAssignment({
        title,
        description,
        dueDate,
        classroom: classroomId,
        createdBy,
      })
      onClose()
      window.location.reload()
    } catch (err) {
      alert('Failed to create assignment: ' + (err as Error).message)
    }

    setTitle('')
    setDescription('')
    setDueDate('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">Create New Assignment</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
