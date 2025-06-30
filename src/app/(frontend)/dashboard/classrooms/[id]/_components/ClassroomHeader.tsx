'use client'

import { useState } from 'react'
import { Users, Settings, UserPlus } from 'lucide-react'
import type { Classroom } from '@/types/classroom'
import InviteModal from './InviteModal'
import { useRoleFilter } from '@/context/RoleFilterContext'

interface ClassroomHeaderProps {
  classroom: Classroom
}

export default function ClassroomHeader({ classroom }: ClassroomHeaderProps) {
  const {role} = useRoleFilter()
  const [showInviteModal, setShowInviteModal] = useState(false)

  const teacherMember = classroom.members?.find(
    (member) => member.role === 'teacher' && member.status === 'approved'
  )
  const teacherName =
    typeof teacherMember?.member === 'object'
      ? teacherMember.member.name
      : classroom.teacher ?? 'Unknown'

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className={`h-3 bg-gradient-to-r ${classroom.color}`}></div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{classroom.name}</h1>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">Teacher:</span> {teacherName}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-500 flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {classroom.studentCount} students
                </span>
              </div>
            </div>

            {role === 'teacher' && (
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite
                </button>
                <button
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
                  onClick={() => window.location.href = `/dashboard/classrooms/${classroom.id}/settings`}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </button>
              </div>
            )}
          </div>
          <p className="text-gray-600 mt-4">{classroom.description}</p>
        </div>
      </div>

      {showInviteModal && (
        <InviteModal
          classCode={classroom.classCode}
          onClose={() => setShowInviteModal(false)}
        />
      )}
    </>
  )
}
