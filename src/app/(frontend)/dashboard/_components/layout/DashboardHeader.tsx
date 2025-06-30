'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, User } from 'lucide-react'
import { Media, Member } from '@/payload-types'
import { useRoleFilter } from '@/context/RoleFilterContext'
import ProfileMenu from './header/ProfileMenu'

interface DashboardHeaderProps {
  user: Member
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const { role, setRole } = useRoleFilter()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Role filter */}
        <div className="flex items-center gap-3">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'student' | 'teacher')}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700"
          >
            <option value="student">As Student</option>
            <option value="teacher">As Teacher</option>
          </select>
        </div>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            className="flex items-center space-x-3 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden shadow-xl ring-4 ring-white bg-white">
              {user?.avatar ? (
                <img
                  src={(user.avatar as Media).url ?? ''}
                  alt={user.name ?? 'User Avatar'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <User className="w-16 h-16 text-white" />
                </div>
              )}
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium text-gray-700">{user.name}</div>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {isProfileMenuOpen && <ProfileMenu />}
        </div>
      </div>
    </header>
  )
}
