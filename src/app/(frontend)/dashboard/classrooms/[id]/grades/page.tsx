'use client'

import { use } from 'react'
import { useEffect, useState } from 'react'
import GradesTab from './components/GradesTab'
import { getSubmissions } from './_actions/getSubmissions'
import { useRoleFilter } from '@/context/RoleFilterContext'
import type { Submission } from '@/types/submission'

export default function GradesPageClient({ params }: { params: Promise<{ id: string }> }) {
  const { role } = useRoleFilter()
  const { id } = use(params) 
  const [submissions, setSubmissions] = useState<Submission[]>([])

  useEffect(() => {
    async function fetchData() {
      const data = await getSubmissions(role, id)
      setSubmissions(data)
    }

    fetchData()
  }, [role, id])

  return <GradesTab submissions={submissions} classroomId={id} />
}
