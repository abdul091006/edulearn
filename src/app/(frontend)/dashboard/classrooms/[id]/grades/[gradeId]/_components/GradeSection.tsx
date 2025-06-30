'use client'

import { useRoleFilter } from '@/context/RoleFilterContext'
import { Submission } from '@/types/submission'
import { useState } from 'react'
import { gradeSubmission } from '../../_actions/gradeSubmission'

interface GradeSectionProps {
  submission: Submission
}

export function GradeSection({ submission }: GradeSectionProps) {
  const { role } = useRoleFilter()
  const [grade, setGrade] = useState(submission.grade?.toString() || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const getGradeInfo = (grade?: number) => {
    if (!grade)
      return {
        color: 'text-slate-500',
        bg: 'bg-slate-100',
        gradient: 'from-slate-400 to-slate-500',
        label: 'Belum Dinilai',
        ring: 'ring-slate-200',
      }
    if (grade >= 90)
      return {
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        gradient: 'from-emerald-400 to-green-500',
        label: 'Excellent',
        ring: 'ring-emerald-200',
      }
    if (grade >= 80)
      return {
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        gradient: 'from-blue-400 to-indigo-500',
        label: 'Good',
        ring: 'ring-blue-200',
      }
    if (grade >= 70)
      return {
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        gradient: 'from-amber-400 to-orange-500',
        label: 'Fair',
        ring: 'ring-amber-200',
      }
    return {
      color: 'text-red-600',
      bg: 'bg-red-50',
      gradient: 'from-red-400 to-rose-500',
      label: 'Needs Improvement',
      ring: 'ring-red-200',
    }
  }

  const gradeInfo = getGradeInfo(submission.grade)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!grade || isNaN(Number(grade)) || Number(grade) < 0 || Number(grade) > 100) {
      setError('Masukkan nilai antara 0 dan 100.')
      return
    }

    setIsSubmitting(true)
    setError(null)
    try {
      const result = await gradeSubmission({
        submissionId: submission.id,
        grade: Number(grade),
        feedback: submission.feedback || undefined,
      })

      if (!result.success) {
        throw new Error(result.message || 'Gagal menyimpan nilai')
      }

      setIsEditing(false)
      window.location.reload()
    } catch (error: any) {
      console.error('Error submitting grade:', error)
      setError(`Terjadi kesalahan: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-slate-800">Penilaian</h2>
          <p className="text-slate-500 text-sm">Hasil evaluasi submission</p>
        </div>
      </div>

      {submission.grade !== undefined && !isEditing ? (
        <div className="space-y-6">
          <div className="text-center">
            <div
              className={`w-32 h-32 mx-auto bg-gradient-to-br ${gradeInfo.gradient} rounded-3xl flex items-center justify-center shadow-2xl ring-4 ${gradeInfo.ring} transform hover:scale-105 transition-all duration-300`}
            >
              <div className="text-center">
                <div className="text-4xl font-black text-white mb-1">{submission.grade}</div>
                <div className="text-xs font-semibold text-white opacity-90">/ 100</div>
              </div>
            </div>
            <div
              className={`mt-4 px-4 py-2 ${gradeInfo.bg} ${gradeInfo.color} rounded-full font-bold text-sm inline-block border-2 ${gradeInfo.ring}`}
            >
              {gradeInfo.label}
            </div>
          </div>
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                  Dinilai oleh
                </label>
                <div className="flex items-center">
                  <p className="text-slate-800 font-semibold">{submission.gradedBy ?? '-'}</p>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                  Tanggal Penilaian
                </label>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-slate-800 font-medium">
                    {submission.gradedAt
                      ? new Date(submission.gradedAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '-'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Edit button moved here */}
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
                Edit Nilai
              </button>
            </div>
          )}
        </div>
      ) : role === 'teacher' ? (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-600 mb-4">{isEditing ? 'Edit Nilai' : 'Beri Nilai'}</h3>
          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100"
          >
            {error && (
              <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>
            )}
            <div className="mb-4">
              <label htmlFor="grade" className="text-sm font-semibold text-slate-600 mb-2 block">
                Nilai (0-100)
              </label>
              <input
                id="grade"
                type="number"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="Masukkan nilai"
                min="0"
                max="100"
                className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
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
                    setGrade(submission.grade?.toString() || '')
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
            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-600 mb-2">Belum Dinilai</h3>
          <p className="text-slate-500">Submission ini sedang menunggu penilaian dari pengajar</p>
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
            <p className="text-sm text-slate-600">💡 Penilaian akan muncul setelah pengajar mengevaluasi submission</p>
          </div>
        </div>
      )}
    </div>
  )
}
