'use client'

import { useRoleFilter } from '@/context/RoleFilterContext'
import GradesFilter from './GradesFilter'
import GradesHeader from './GradesHeader'
import GradesSummary from './GradesSummary'
import RecentGrades from './RecentGrades'
import { Submission } from '@/types/submission'
import { useEffect, useState } from 'react'
import { getSubmissions } from '../_actions/getSubmissions'
import getClassrooms from '../_actions/getClassrooms'

export default function GradesLayout() {
  const { role } = useRoleFilter()
  const [submissions, setSubmissions] = useState<Submission[]>([])

  useEffect(() => {
    async function fetchData() {
      const submissionsData = await getSubmissions(role)
      setSubmissions(submissionsData)
    }

    fetchData()
  }, [role])
  return (
    <div className="space-y-6">
      <GradesHeader />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <GradesSummary submissions={submissions} />
        <div className="md:col-span-2">
          <RecentGrades role={role} submissions={submissions} />
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <GradesFilter role={role} submissions={submissions} />
      </div>
    </div>
  )
}
