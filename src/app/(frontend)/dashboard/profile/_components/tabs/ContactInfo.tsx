"use client"

import { Member } from "@/payload-types"
import { Mail, Phone, MapPin, Edit3 } from "lucide-react"
import Link from "next/link"

interface PersonalInfoProps {
  user: Member
}

export default function ContactInfo({ user }: PersonalInfoProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Phone className="w-5 h-5 text-purple-600" />
            Contact Information
          </h3>
          <p className="text-gray-600 mt-1">
            Manage your contact details and emergency contacts
          </p>
        </div>
        <Link
          href="/dashboard/profile/edit"
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors duration-200 font-medium text-gray-700"
        >
          <Edit3 className="w-4 h-4" />
          Edit
        </Link>
      </div>

      {/* Primary Contact */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-600" />
          Primary Contact
        </h4>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="px-4 py-3 bg-white rounded-lg border border-gray-200 shadow-sm">
              <p className="text-gray-900 font-medium">{user?.email ?? "N/A"}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <div className="px-4 py-3 bg-white rounded-lg border border-gray-200 shadow-sm">
              <p className="text-gray-900 font-medium">{user?.phone ?? "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-green-600" />
          Address Information
        </h4>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
            <div className="px-4 py-3 bg-white rounded-lg border border-gray-200 shadow-sm">
              <p className="text-gray-900 font-medium">{user?.address ?? "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
