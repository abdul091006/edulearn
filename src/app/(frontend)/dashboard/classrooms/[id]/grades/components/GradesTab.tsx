'use client'

import GradesFilter from '@/app/(frontend)/dashboard/classrooms/[id]/grades/components/GradesFilter'
import GradesSummary from '@/app/(frontend)/dashboard/classrooms/[id]/grades/components/GradesSummary'
import { useRoleFilter } from '@/context/RoleFilterContext'
import { Submission } from '@/types/submission'

interface GradesTabProps {
  submissions: Submission[]
  classroomId: string
}

export default function GradesTab({ submissions, classroomId }: GradesTabProps) {
  const { role } = useRoleFilter()

  return (
    <div className="flex flex-col gap-6 lg:flex-row mt-4">
      {/* Left: Grade Summary (30%) */}
      <div className="lg:w-1/3 w-full">
        <GradesSummary submissions={submissions} />
      </div>

      {/* Right: Filter (70%) */}
      <div className="lg:w-2/3 w-full">
        <GradesFilter submissions={submissions} role={role} classroomId={classroomId} />
      </div>
    </div>
  )
}
