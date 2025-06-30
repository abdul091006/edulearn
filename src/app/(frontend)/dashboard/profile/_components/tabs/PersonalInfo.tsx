'use client'

import { Member } from '@/payload-types'
import { Edit3, Calendar, Globe, User } from 'lucide-react'
import Link from 'next/link'

interface PersonalInfoProps {
  user: Member
}

export default function PersonalInfo({ user }: PersonalInfoProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <User className="w-5 h-5 text-purple-600" />
            Personal Information
          </h3>
          <p className="text-gray-600 mt-1">Manage your personal details and preferences</p>
        </div>
        <Link
          href="/dashboard/profile/edit"
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors duration-200 font-medium text-gray-700"
        >
          <Edit3 className="w-4 h-4" />
          Edit
        </Link>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-900 font-medium">{user?.name}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date of Birth
              </label>
              <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-900 font-medium">
                  {user?.dateOfBirth
                    ? new Date(user.dateOfBirth).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">Gender</label>
              <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-900 font-medium capitalize">{user?.gender || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio - Full Width */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-900 leading-relaxed">{user?.bio || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
