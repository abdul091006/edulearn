import { Calendar, FileText } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { Submission } from '@/types/submission'
import GradeButton from './GradeButton'

interface RecentGradesProps {
  submissions: Submission[]
  role: 'teacher' | 'student'
}

const GRADE_COLOR_MAP = {
  A: { class: 'text-green-600', stroke: '#16a34a' },
  B: { class: 'text-emerald-600', stroke: '#059669' },
  C: { class: 'text-yellow-600', stroke: '#ca8a04' },
  D: { class: 'text-orange-600', stroke: '#ea580c' },
  F: { class: 'text-red-600', stroke: '#dc2626' },
}

const getGradeData = (percentage: any) => {
  if (percentage >= 90) return { letter: 'A', ...GRADE_COLOR_MAP.A }
  if (percentage >= 80) return { letter: 'B', ...GRADE_COLOR_MAP.B }
  if (percentage >= 70) return { letter: 'C', ...GRADE_COLOR_MAP.C }
  if (percentage >= 60) return { letter: 'D', ...GRADE_COLOR_MAP.D }
  return { letter: 'F', ...GRADE_COLOR_MAP.F }
}

export default function RecentGrades({ submissions, role }: RecentGradesProps) {
  return (
    <div className="h-full rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-gray-800">Recent Grades</h2>

      <div className="space-y-4">
        {submissions.map((submission) => {
          const percentage = submission.grade

          return (
            <div
              key={submission.id}
              className="group flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-purple-200 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{submission.assignment}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    {role === 'teacher' && <span>{submission.student}</span>}
                    <span>{submission.classroom}</span>
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {formatDate(submission.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {percentage != null ? (
                  <>
                    {(() => {
                      const { letter, class: gradeClass, stroke } = getGradeData(percentage)
                      return (
                        <>
                          <div className="text-right">
                            <div className={cn('text-lg font-bold', gradeClass)}>{letter}</div>
                            <div className="text-xs text-gray-500">{percentage}/100</div>
                          </div>
                          <div className="h-12 w-12 rounded-full bg-gray-100 p-1">
                            <div className="relative h-full w-full">
                              <svg className="h-full w-full" viewBox="0 0 36 36">
                                <path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="#e5e7eb"
                                  strokeWidth="3"
                                />
                                <path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke={stroke}
                                  strokeWidth="3"
                                  strokeDasharray={`${percentage}, 100`}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                                {Math.round(percentage)}%
                              </div>
                            </div>
                          </div>
                        </>
                      )
                    })()}
                  </>
                ) : role === 'student' ? (
                  <div className="text-sm text-yellow-600 font-medium">Belum dinilai</div>
                ) : (
                  <GradeButton submissionId={submission.id} />
                )}
              </div>
            </div>
          )
        })}
      </div>

      <button className="mt-4 w-full rounded-lg border border-purple-200 bg-purple-50 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-100">
        View All Grades
      </button>
    </div>
  )
}
