'use client'

import { Submission } from '@/types/submission'
import { GradeInfo } from './GradeInfo'
import { FilePreview } from './FilePreview'
import { GradeSection } from './GradeSection'
import { FeedbackSection } from './FeedbackSection'

interface GradeDetailProps {
  submission: Submission
}

export function GradeDetail({ submission }: GradeDetailProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center mb-6">
            <button className="text-slate-600 hover:text-slate-800 mr-6 p-2 rounded-xl hover:bg-white/50 transition-all duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-2">
                Detail Submission
              </h1>
              <p className="text-slate-600 text-lg">Informasi lengkap submission siswa</p>
            </div>
          </div>
          <div className="h-2 w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-full shadow-lg"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-2 space-y-8">
            <GradeInfo submission={submission} />
            {submission.file && <FilePreview file={submission.file} />}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            <GradeSection submission={submission} />
            <FeedbackSection submission={submission} />
          </div>
        </div>
      </div>
    </div>
  )
}
