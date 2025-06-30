'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  Save,
  X,
  Camera,
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from 'lucide-react'
import Link from 'next/link'
import { EditProfile } from '../_actions/EditProfile'
import { Member } from '@/payload-types'

interface ProfileHeaderProps {
  user: Member
}

export default function EditProfileForm({ user }: ProfileHeaderProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || '',
    bio: user?.bio || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  })

  const [previewAvatar, setPreviewAvatar] = useState<string | null>(
    user?.avatar && typeof user.avatar === 'object' && user.avatar.url ? user.avatar.url : null
  )
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Hanya file JPEG atau PNG yang diizinkan.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran file terlalu besar. Maksimum 5MB.')
      return
    }

    setError(null)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewAvatar(reader.result as string)
    }
    reader.readAsDataURL(file)
    setAvatarFile(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    let fileId: string | undefined

    if (avatarFile) {
      const avatarData = new FormData()
      avatarData.append('file', avatarFile)
      avatarData.append('_payload', JSON.stringify({ alt: avatarFile.name || 'Profile Avatar' }))

      try {
        const uploadRes = await fetch('/api/media', {
          method: 'POST',
          body: avatarData,
          credentials: 'include',
        })

        if (!uploadRes.ok) {
          let errorData
          try {
            errorData = await uploadRes.json()
            console.error('Upload error JSON:', errorData)
          } catch {
            errorData = await uploadRes.text()
            console.error('Upload error text:', errorData)
          }
          throw new Error(`File upload failed: ${JSON.stringify(errorData)}`)
        }

        const { doc } = await uploadRes.json()
        fileId = doc.id
      } catch (error: any) {
        console.error('Avatar upload failed:', error)
        setError(`Gagal mengunggah avatar: ${error.message}`)
        setIsSubmitting(false)
        return
      }
    }

    const data = new FormData()
    data.append('name', formData.name)
    data.append('dateOfBirth', formData.dateOfBirth)
    data.append('gender', formData.gender)
    data.append('bio', formData.bio)
    data.append('email', formData.email)
    data.append('phone', formData.phone)
    data.append('address', formData.address)
    if (fileId) {
      data.append('avatarId', fileId)
    }

    try {
      const result = await EditProfile(data)
      if (!result.success) {
        throw new Error(result.error || 'Gagal memperbarui profil')
      }
      window.location.href = '/dashboard/profile'
    } catch (error: any) {
      console.error('Profile update failed:', error)
      setError(`Gagal memperbarui profil: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    window.location.href = '/dashboard/profile'
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/profile"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
            <p className="text-gray-600 mt-1">
              Update your personal information and contact details
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Picture</h2>
        <div className="flex items-center gap-6">
          <div className="relative group">
            {previewAvatar ? (
              <img
                src={previewAvatar}
                alt="Avatar preview"
                className="w-24 h-24 rounded-full object-cover shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <UserIcon className="w-12 h-12 text-white" />
              </div>
            )}
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 p-1.5 bg-white text-purple-600 rounded-full shadow-lg hover:bg-purple-50 transition-all duration-200 group-hover:scale-110 cursor-pointer"
            >
              <Camera className="w-3 h-3" />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Change Profile Picture</h3>
            <p className="text-sm text-gray-600 mb-3">Upload a new profile picture (JPEG/PNG, max 5MB).</p>
            <label
              htmlFor="avatar-upload"
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors duration-200 cursor-pointer"
            >
              Upload New Picture
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-purple-600" />
          Personal Information
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date of Birth
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="lg:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Mail className="w-5 h-5 text-gray-600" />
          Contact Information
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your email address"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="lg:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your full address"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700 transition-colors duration-200"
          disabled={isSubmitting}
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 px-8 py-2 rounded-lg font-medium transition-colors duration-200 disabled:bg-purple-400"
          disabled={isSubmitting}
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}