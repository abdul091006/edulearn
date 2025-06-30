'use client'

import { useRoleFilter } from '@/context/RoleFilterContext'
import { Submission } from '@/types/submission'
import { useState } from 'react'
import { gradeSubmission } from '../../_actions/gradeSubmission'

interface FeedbackSectionProps {
  submission: Submission
}

export function FeedbackSection({ submission }: FeedbackSectionProps) {
  const { role } = useRoleFilter()
  const [feedback, setFeedback] = useState(submission.feedback || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!feedback.trim()) {
      setError('Feedback tidak boleh kosong.')
      return
    }

    setIsSubmitting(true)
    setError(null)
    try {
      const result = await gradeSubmission({
        submissionId: submission.id,
        grade: submission.grade ?? 0,
        feedback: feedback.trim(),
      })

      if (!result.success) {
        throw new Error(result.message || 'Gagal menyimpan feedback')
      }

      setIsEditing(false)
      window.location.reload()
    } catch (error: any) {
      console.error('Error submitting feedback:', error)
      setError(`Terjadi kesalahan: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-slate-800">Feedback</h2>
          <p className="text-slate-500 text-sm">Komentar dan saran dari pengajar</p>
        </div>
      </div>

      {submission.feedback && !isEditing ? (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100 shadow-inner">
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-200 overflow-x-auto">
                  <p className="text-slate-800 leading-relaxed text-base break-all whitespace-pre-wrap">
                    {submission.feedback}
                  </p>
                </div>

                {submission.gradedBy && (
                  <div className="mt-4 flex items-center">
                    <p className="text-sm text-slate-600 font-semibold">— {submission.gradedBy}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-slate-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Feedback diberikan pada{' '}
                {submission.gradedAt
                  ? new Date(submission.gradedAt).toLocaleDateString('id-ID')
                  : '-'}
              </div>
            </div>
          </div>

          {role === 'teacher' && (
            <div className="text-center mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Feedback
              </button>
            </div>
          )}
        </div>
      ) : role === 'teacher' && (isEditing || !submission.feedback) ? (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-600 mb-4">
            {isEditing ? 'Edit Feedback' : 'Beri Feedback'}
          </h3>
          <form
            onSubmit={handleSubmitFeedback}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100"
          >
            {error && (
              <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>
            )}
            <div className="mb-4">
              <label htmlFor="feedback" className="text-sm font-semibold text-slate-600 mb-2 block">
                Feedback
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Masukkan feedback untuk siswa"
                className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 min-h-[120px]"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center disabled:opacity-50"
              >
                {isSubmitting ? 'Menyimpan...' : isEditing ? 'Perbarui' : 'Simpan'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false)
                    setFeedback(submission.feedback || '')
                    setError(null)
                  }}
                  className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-rose-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg
              className="w-12 h-12 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-600 mb-2">Belum Ada Feedback</h3>
          <p className="text-slate-500 mb-6">Feedback akan muncul setelah submission dinilai</p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6 text-blue-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-blue-700 font-semibold">Info</span>
            </div>
            <p className="text-sm text-slate-600">
              Pengajar akan memberikan feedback konstruktif untuk membantu pembelajaran Anda
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
