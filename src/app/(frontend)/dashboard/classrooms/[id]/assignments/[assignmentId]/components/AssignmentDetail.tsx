'use client'

import type { Assignment } from '@/types/assignment'
import type { Submission } from '@/types/submission'
import {
  Calendar,
  User,
  Clock,
  CheckCircle,
  ArrowLeft,
  Upload,
  FileText,
  Download,
} from 'lucide-react'
import { formatDate, getDaysLeft } from '@/lib/utils'
import { useRef, useState } from 'react'
import { createSubmission } from '@/app/(frontend)/dashboard/classrooms/[id]/grades/_actions/createSubmission'
import { useRouter } from 'next/navigation'

interface AssignmentDetailProps {
  assignment: Assignment
  user: any
  submissions: Submission[]
}

export default function AssignmentDetail({ assignment, user, submissions }: AssignmentDetailProps) {
  const router = useRouter()
  const [currentAssignment, setCurrentAssignment] = useState<Assignment>(assignment)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const daysLeft = getDaysLeft(currentAssignment.dueDate)

  const userSubmission = submissions.find(
    (s) => String(s.assignment) === String(assignment.id) && String(s.student) === String(user.id),
  )
  const submitted = !!userSubmission

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleChooseFile = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please select a file first.')
      return
    }

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('_payload', JSON.stringify({ alt: selectedFile.name }))

      const uploadRes = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      })

      if (!uploadRes.ok) throw new Error('File upload failed')

      const { doc } = await uploadRes.json()
      const fileId = doc.id

      await createSubmission({
        classroom: currentAssignment.classroom.id.toString(),
        assignment: currentAssignment.id.toString(),
        student: user.id.toString(),
        file: fileId.toString(),
      })

      alert('Assignment submitted successfully!')
      router.refresh()
    } catch (error) {
      console.error('Submission failed:', error)
      alert(`Failed to submit assignment: ${error}`)
    }
  }

  const getFilePreviewUrl = (file: { id: string; filename?: string; url?: string }) => {
    if (!file) return ''
    return file.url || `/media/${file.filename}`
  }
  {userSubmission?.file?.id && console.log(getFilePreviewUrl(userSubmission.file))}

  return (
    <div className="space-y-6 mt-4">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        <span className="text-sm font-medium">Back to assignments</span>
      </button>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div
          className={`h-1 w-full ${submitted ? 'bg-green-500' : daysLeft <= 1 ? 'bg-red-500' : 'bg-indigo-500'}`}
        />
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6">
            <div className="flex items-start space-x-4 mb-4 lg:mb-0">
              <div className="p-3 bg-gray-100 rounded-lg">
                <FileText className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 mb-1">{currentAssignment.title}</h1>
                <p className="text-sm text-gray-600">{currentAssignment.classroom.name}</p>
              </div>
            </div>
            {submitted ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <CheckCircle className="h-4 w-4 mr-1.5" />
                Completed
              </span>
            ) : (
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${daysLeft <= 1 ? 'bg-red-100 text-red-800' : daysLeft <= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}
              >
                <Clock className="h-4 w-4 mr-1.5" />
                {daysLeft === 0
                  ? 'Due today'
                  : daysLeft < 0
                    ? 'Overdue'
                    : `${daysLeft} day${daysLeft !== 1 ? 's' : ''}`}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Due Date</p>
                <p className="font-medium text-gray-900">{formatDate(currentAssignment.dueDate)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Teacher</p>
                <p className="font-medium text-gray-900">{currentAssignment.classroom.teacher}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <CheckCircle className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <p className="font-medium text-gray-900">
                  {submitted ? 'Done' : currentAssignment.status}
                </p>
              </div>
            </div>
          </div>

          {currentAssignment.description && (
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">Assignment Description</h2>
              <div className="bg-gray-50 rounded-lg border border-gray-100 p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {currentAssignment.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {!submitted ? (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Submit Your Work</h2>
          <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">Upload your assignment</h3>
            <p className="text-xs text-gray-500 mb-4">
              Drag and drop your files here, or click to browse
            </p>
            <button
              type="button"
              onClick={handleChooseFile}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </button>
            {selectedFile && <p className="text-sm text-gray-700 mt-2">{selectedFile.name}</p>}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Submit Assignment
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-start">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className='w-full'>
              <h2 className="text-base font-semibold text-gray-900 mb-1">Assignment Completed</h2>
              <p className="text-sm text-gray-600 mb-3">
                You've successfully submitted this assignment.
              </p>
              <div className="w-full bg-gray-50 rounded-lg border border-gray-100 p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-gray-900">Your Submission</p>
                  <span className="text-xs text-gray-500">Submitted</span>
                </div>
                <div className="flex items-center p-2 bg-white rounded-md border border-gray-200">
                  <div className="p-1.5 bg-indigo-100 rounded-md mr-3">
                    <FileText className="h-3.5 w-3.5 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-xs truncate">
                      {userSubmission?.file?.filename || 'assignment_submission.pdf'}
                    </p>
                  </div>
                  <button
                    onClick={async () => {
                      try {
                        const fileUrl = userSubmission.file ? getFilePreviewUrl(userSubmission.file) : ''
                        if (!fileUrl) throw new Error('No file URL found')

                        const response = await fetch(fileUrl, {
                          headers: {
                            Accept: 'application/octet-stream',
                          },
                        })

                        if (!response.ok) throw new Error('Failed to fetch file')

                        const blob = await response.blob()

                        // Debug response isi blob
                        if (blob.type.includes('application/json')) {
                          const errorText = await blob.text()
                          console.error('Unexpected JSON instead of file:', errorText)
                          alert('File download failed: server did not return the file.')
                          return
                        }

                        const url = window.URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.href = url
                        a.download = userSubmission.file?.filename || 'downloaded_file'
                        document.body.appendChild(a)
                        a.click()
                        a.remove()
                        window.URL.revokeObjectURL(url)
                      } catch (err) {
                        console.error('Download failed:', err)
                        alert('Failed to download file.')
                      }
                    }}
                    className="p-1 bg-gray-50 rounded-md border border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
                {userSubmission?.file?.id && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">File Preview</p>
                    <iframe
                      src={getFilePreviewUrl(userSubmission.file)}
                      className="w-full h-64 border border-gray-200 rounded-md min-h-[500px]"
                      title="File Preview"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
