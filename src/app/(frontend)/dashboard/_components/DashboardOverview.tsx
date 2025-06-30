'use client'

import { useEffect, useState } from 'react'
import { getUser } from '../../_actions/getUser'
import getClassrooms from '../classrooms/_actions/getClassrooms'
import type { Classroom } from '@/types/classroom'
import ClassroomsOverview from '../classrooms/_components/ClassroomsOverview'
import { useRoleFilter } from '@/context/RoleFilterContext'

export default function DashboardOverview() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([])
  const [currentUserEmail, setCurrentUserEmail] = useState('')

  const { role } = useRoleFilter()

  useEffect(() => {
    async function fetchData() {
      const [userData, classroomData] = await Promise.all([getUser(), getClassrooms(role)])
      setCurrentUserEmail(userData.email)
      setClassrooms(classroomData)
    }

    fetchData()
  }, [role])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 p-8 text-white shadow-lg">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white"></div>
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white"></div>
          <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white opacity-10"></div>
        </div>

        <div className="relative">
          <h1 className="text-2xl font-bold">Welcome back!</h1>
  
          <p className="text-purple-100">Manage your classrooms below</p>
        </div>
      </div>

      {/* Classrooms Overview */}
      <ClassroomsOverview classrooms={classrooms} />
    </div>
  )
}
