'use client'

import { useState } from 'react'
import TeacherSection from './TeacherSection'
import StudentsList from './StudentsList'
import RequestModal from './RequestModal'
import { Classroom } from '@/types/classroom'
import { Member } from '@/payload-types'

interface PeopleTabProps {
  classroom: Classroom
  pendingRequests: Member[]
  user: any
}

export default function PeopleTab({ classroom, pendingRequests, user }: PeopleTabProps) {
  const [showRequestModal, setShowRequestModal] = useState(false)

  const teacher = classroom.members?.find((m) => m.role === 'teacher')

  const [students, setStudents] = useState<Member[]>(
    () =>
      classroom.members
        ?.filter(
          (
            m,
          ): m is typeof m & {
            member: {
              name: string
              email?: string
              id?: string
              createdAt?: string
            }
          } => m.role === 'student' && m.status === 'approved' && typeof m.member === 'object',
        )
        .map((m) => ({
          id: Number(m.member.id) || 0,
          name: m.member.name,
          email: m.member.email ?? '',
          createdAt:
            typeof m.member.createdAt === 'string' ? m.member.createdAt : new Date().toISOString(),
          updatedAt: '',
          avatar: (m.member as any).avatar ?? undefined,
        })) ?? [],
  )

  const [pending, setPending] = useState<Member[]>(pendingRequests)

  const teacherName =
    teacher && typeof teacher.member === 'object' ? teacher.member.name : 'Unknown'

  return (
    <div className="space-y-6 relative mt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">People</h2>

        {/* Tombol Join Requests */}
        <button
          onClick={() => setShowRequestModal(true)}
          className="inline-flex items-center px-5 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
        >
          Join Requests
          {pending.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-fuchsia-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full border-2 border-white">
              {pending.length}
            </span>
          )}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <TeacherSection teacher={teacherName} user={user} />
        <StudentsList students={students} />
      </div>

      {/* Modal untuk request join */}
      {showRequestModal && (
        <RequestModal
          requests={pending}
          onClose={() => setShowRequestModal(false)}
          onApprove={(member) => {
            setStudents((prev) => [...prev, member])
            setPending((prev) => prev.filter((r) => r.id !== member.id))
          }}
          onReject={(memberId) => {
            setPending((prev) => prev.filter((r) => r.id !== Number(memberId)))
          }}
        />
      )}
    </div>
  )
}
