'use client'

import { useState, useMemo } from 'react'
import { Classroom } from '@/types/classroom'
import ClassroomsHeader from './ClassroomsHeader'
import ClassroomsList from './ClassroomsList'
import EmptyClassrooms from './EmptyClassrooms'
import JoinClassModal from './JoinClassModal'
import CreateClassModal from './CreateClassModal'
import { useRoleFilter } from '@/context/RoleFilterContext'

type ClassroomOverviewProps = {
  classrooms: Classroom[]
}

export default function ClassroomsOverview({ classrooms }: ClassroomOverviewProps) {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortAsc, setSortAsc] = useState(true)
  const { role } = useRoleFilter()

  const handleMainButtonClick = () => {
    if (role === 'teacher') setIsCreateModalOpen(true)
    else setIsJoinModalOpen(true)
  }

  const filteredClassrooms = useMemo(() => {
    const bySearch = classrooms.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return [...bySearch].sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    )
  }, [classrooms, searchTerm, sortAsc])

  const handlecreate = () => {
    setIsCreateModalOpen(true)
  }

  return (
    <div>
      <ClassroomsHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onJoinClick={handleMainButtonClick}
        onToggleSort={() => setSortAsc((prev) => !prev)}
      />

      {filteredClassrooms.length > 0 ? (
        <ClassroomsList classrooms={filteredClassrooms} />
      ) : (
        <EmptyClassrooms onJoinClass={handleMainButtonClick} />
      )}

      <JoinClassModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
      <CreateClassModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  )
}
