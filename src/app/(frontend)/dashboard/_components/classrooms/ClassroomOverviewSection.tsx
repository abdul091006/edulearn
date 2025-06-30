'use client'

import Link from 'next/link'
import ClassroomCard from './ClassroomCard'
import { Classroom } from '@/types/classroom'
import { useRoleFilter } from '@/context/RoleFilterContext'
import { useMemo } from 'react'

type ClassroomOverviewSectionProps = {
  classrooms: Classroom[];
  currentUserEmail: string;
}

export default function ClassroomOverviewSection({
  classrooms,
  currentUserEmail,
}: ClassroomOverviewSectionProps) {
  const { role } = useRoleFilter();

  const filteredClassrooms = useMemo(() => {
    return classrooms.filter((classroom) => {
      const userMember = classroom.members?.find((member) => {
        const email =
          typeof member.member === 'string'
            ? member.member
            : member.member?.email;
        return email === currentUserEmail && member.status === 'approved';
      });
      return userMember?.role === role;
    });
  }, [classrooms, currentUserEmail, role]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Your Classrooms</h3>
        <Link
          href="/dashboard/classrooms"
          className="text-sm font-medium text-purple-600 hover:text-purple-700"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
        {filteredClassrooms.slice(0, 4).map((classroom) => (
          <ClassroomCard
            key={classroom.id}
            classroom={classroom}
          />
        ))}
      </div>
    </div>
  );
}
