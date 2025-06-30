'use client'

import { useState, useMemo } from 'react'
import { ArrowDown, ArrowUp, ChevronDown, Filter, Search } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { Submission } from '@/types/submission'
import GradeButton from './GradeButton'
import GradeCircle from './GradeCircle'
import { useRouter } from 'next/navigation'

type FilterOption = {
  label: string
  value: string
}

type GradesFilterProps = {
  submissions: Submission[]
  role: 'teacher' | 'student'
  classroomId?: string
}

export default function GradesFilter({ submissions, role, classroomId }: GradesFilterProps) {
  const router = useRouter()
  const noneOption = { label: 'None', value: '' }

  const [studentFilter, setStudentFilter] = useState<FilterOption>(noneOption)
  const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<
    'name' | 'assignment' | 'class' | 'submittedDate' | 'grade'
  >('assignment')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const studentOptions = useMemo(() => {
    const uniqueStudents = Array.from(new Set(submissions.map((s) => s.student || 'Unknown')))
    return [
      noneOption,
      ...uniqueStudents.map((student) => ({
        label: student,
        value: student,
      })),
    ]
  }, [submissions])

  const filteredGrades = submissions
    .filter((grade) => {
      const matchesStudent = studentFilter.value === '' || grade.student === studentFilter.value
      const assignmentText = typeof grade.assignment === 'string' ? grade.assignment : ''
      const studentText = grade.student || 'Unknown'
      const matchesSearch =
        assignmentText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        studentText.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesStudent && matchesSearch
    })
    .sort((a, b) => {
      const order = sortDirection === 'asc' ? 1 : -1
      if (sortField === 'assignment') return a.assignment.localeCompare(b.assignment) * order
      if (sortField === 'name') return a.student.localeCompare(b.student) * order
      if (sortField === 'class') return a.classroom.localeCompare(b.classroom) * order
      if (sortField === 'submittedDate') {
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * order
      }
      if (sortField === 'grade') return ((a.grade ?? 0) - (b.grade ?? 0)) * order
      return 0
    })

  return (
    <div>
      {/* Filters */}
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assignment or student..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Student Dropdown hanya untuk teacher */}
        {role === 'teacher' && (
          <div className="relative">
            <button
              onClick={() => setIsStudentDropdownOpen(!isStudentDropdownOpen)}
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm"
            >
              <Filter className="h-4 w-4 text-gray-500" />
              {studentFilter.label}
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>

            {isStudentDropdownOpen && (
              <div className="absolute right-0 z-10 mt-1 w-48 rounded-lg border bg-white shadow-md">
                {studentOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setStudentFilter(option)
                      setIsStudentDropdownOpen(false)
                    }}
                    className={cn(
                      'w-full px-4 py-2 text-left text-sm hover:bg-gray-100',
                      studentFilter.value === option.value &&
                        'bg-purple-50 text-purple-700 font-medium',
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b bg-gray-50">
                {[
                  { field: 'name', label: 'Name' },
                  { field: 'assignment', label: 'Assignment' },
                  { field: 'class', label: 'Class' },
                  { field: 'submittedDate', label: 'Submitted Date' },
                  { field: 'grade', label: 'Grade' },
                ].map(({ field, label }) => (
                  <th
                    key={field}
                    onClick={() => handleSort(field as typeof sortField)}
                    className="cursor-pointer px-6 py-4 text-sm font-medium text-gray-500 hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-1">
                      {label}
                      {sortField === field &&
                        (sortDirection === 'asc' ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        ))}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredGrades.map((grade) => (
                <tr
                  key={grade.id}
                  onClick={() =>
                    router.push(
                      `/dashboard/classrooms/${classroomId}/grades/${grade.id}`,
                    )
                  }
                  className="cursor-pointer hover:bg-gray-100 transition"
                >
                  <td className="px-6 py-4 text-sm text-gray-700">{grade.student || 'Unknown'}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{grade.assignment}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{grade.classroom}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{formatDate(grade.createdAt)}</td>
                  <td className="px-6 py-4 text-sm">
                    {typeof grade.grade === 'number' ? (
                      <GradeCircle grade={grade.grade} />
                    ) : role === 'teacher' ? (
                      <GradeButton submissionId={grade.id} />
                    ) : (
                      'Belum Dinilai'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
