"use client"

import { useState } from "react"
import { User, Phone } from "lucide-react"
import PersonalInfo from "./tabs/PersonalInfo"
import ContactInfo from "./tabs/ContactInfo"
import { Member } from "@/payload-types"

const tabs = [
  {
    id: "personal",
    label: "Personal Information",
    icon: User,
    description: "Basic personal details and bio",
  },
  {
    id: "contact",
    label: "Contact Information",
    icon: Phone,
    description: "Contact details and emergency contacts",
  },
]

interface ProfileTabsProps {
  user: Member
}

export default function ProfileTabs({ user }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Tab Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <nav className="flex">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-left transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white text-purple-600 border-b-2 border-purple-500 shadow-sm"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      activeTab === tab.id ? "bg-purple-100 text-purple-600" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium">{tab.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{tab.description}</div>
                  </div>
                </div>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === "personal" && <PersonalInfo user={user} />}
        {activeTab === "contact" && <ContactInfo user={user} />}
      </div>
    </div>
  )
}
