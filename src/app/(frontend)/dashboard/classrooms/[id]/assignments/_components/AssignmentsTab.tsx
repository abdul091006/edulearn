'use client'

import { useMemo, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { useRoleFilter } from '@/context/RoleFilterContext'
import type { Classroom } from '@/types/classroom'
import type { Assignment } from '@/types/assignment'
import type { Submission } from '@/types/submission'
import AssignmentsList from './AssignmentList'
import { CreateAssignmentModal } from './CreateAssignmentModal'
import { useRouter } from 'next/navigation'
import EmptyAssignments from './EmptyAssignment'

interface AssignmentsTabProps {
  classroom: Classroom
  assignments: Assignment[]
  submissions: Submission[]
  userId: number
}

export default function AssignmentsTab({
  classroom,
  assignments,
  submissions,
  userId,
}: AssignmentsTabProps) {
  const { role } = useRoleFilter()
  const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'In Progress' | 'Done' | 'OverDue'>('all')

  const getAssignmentStatus = (assignment: Assignment): 'Done' | 'OverDue' | 'In Progress' => {
    const submission = submissions.find(
      (s) =>
        String(s.assignment) === String(assignment.id) &&
        String(s.student) === String(userId)
    )

    if (submission?.createdAt) return 'Done'

    const dueDate = new Date(assignment.dueDate)
    return dueDate < new Date() ? 'OverDue' : 'In Progress'
  }

  const classroomAssignments = useMemo(
    () => assignments.filter((a) => String(a.classroom.id) === String(classroom.id)),
    [assignments, classroom.id]
  )

  const filteredAssignments = useMemo(() => {
    return classroomAssignments
      .map((a) => ({
        ...a,
        status: getAssignmentStatus(a),
      }))
      .filter((a) => {
        const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchStatus = filterStatus === 'all' || a.status === filterStatus
        return matchSearch && matchStatus
      })
  }, [searchQuery, filterStatus, classroomAssignments, submissions])

  const overdueAssignments = filteredAssignments.filter((a) => a.status === 'OverDue')
  const inProgressAssignments = filteredAssignments.filter((a) => a.status === 'In Progress')
  const doneAssignments = filteredAssignments.filter((a) => a.status === 'Done')

  return (
    <div className="space-y-6 mt-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-800">Assignments</h2>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 ml-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search assignments..."
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            id="statusFilter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="text-sm px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="OverDue">Overdue</option>
          </select>

          {role === 'teacher' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition"
            >
              <Plus className="w-4 h-4 mr-1" />
              Create
            </button>
          )}
        </div>
      </div>

      {filteredAssignments.length === 0 ? (
        <EmptyAssignments />
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {overdueAssignments.length > 0 && (
            <>
              <div className="px-5 py-4 border-b border-gray-200">
                <h3 className="text-base font-semibold text-red-800 flex items-center">
                  Overdue Assignments
                  <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full animate-pulse">
                    {overdueAssignments.length}
                  </span>
                </h3>
              </div>
              <AssignmentsList assignments={overdueAssignments} />
            </>
          )}

          {inProgressAssignments.length > 0 && (
            <>
              <div className="px-5 py-4 border-b border-gray-200">
                <h3 className="text-base font-semibold text-gray-800 flex items-center">
                  In Progress
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {inProgressAssignments.length}
                  </span>
                </h3>
              </div>
              <AssignmentsList assignments={inProgressAssignments} />
            </>
          )}

          {doneAssignments.length > 0 && (
            <>
              <div className="px-5 py-4 border-b border-gray-200">
                <h3 className="text-base font-semibold text-gray-800 flex items-center">
                  Completed Assignments
                  <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                    {doneAssignments.length}
                  </span>
                </h3>
              </div>
              <AssignmentsList assignments={doneAssignments} />
            </>
          )}
        </div>
      )}

      <CreateAssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        classroomId={Number(classroom.id)}
        createdBy={userId}
      />
    </div>
  )
}
