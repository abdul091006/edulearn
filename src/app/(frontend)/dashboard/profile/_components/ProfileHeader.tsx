'use client'
import { formatDate } from '@/lib/utils'
import { Media, Member } from '@/payload-types'
import { Camera, User, Calendar, MapPin, Mail } from 'lucide-react'

interface ProfileHeaderProps {
  user: Member
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Background Cover */}
      <div className="h-32 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className='absolute inset-0 bg-[url(&apos;data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23ffffff" fillOpacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&apos;)] opacity-30'></div>
      </div>

      {/* Profile Content */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 -mt-16 mx-6 relative z-10">
        <div className="p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-xl ring-4 ring-white bg-white">
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

                <button className="absolute bottom-2 right-2 p-2 bg-white text-purple-600 rounded-full shadow-lg hover:bg-purple-50 transition-all duration-200 group-hover:scale-110">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="space-y-3">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">{user?.name}</h1>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {user?.address}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(user?.createdAt ?? '')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {user?.email}
                    </div>
                  </div>

                  <p className="text-gray-700 max-w-2xl leading-relaxed">{user?.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
