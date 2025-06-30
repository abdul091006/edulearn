'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Book,
  FileText,
  Users,
  MessageCircle,
  ClipboardList,
} from 'lucide-react'

export default function ClassroomTabs() {
  const pathname = usePathname()
  const basePath = pathname.split('/').slice(0, 4).join('/')

  const tabs = [
    {
      label: 'Discuss',
      href: `${basePath}/discuss`,
      icon: <MessageCircle className="w-4 h-4 mr-1" />,
    },
    {
      label: 'Materials',
      href: `${basePath}/materials`,
      icon: <Book className="w-4 h-4 mr-1" />,
    },
    {
      label: 'Assignments',
      href: `${basePath}/assignments`,
      icon: <ClipboardList className="w-4 h-4 mr-1" />,
    },
    {
      label: 'People',
      href: `${basePath}/people`,
      icon: <Users className="w-4 h-4 mr-1" />,
    },
    {
      label: 'Grades',
      href: `${basePath}/grades`,
      icon: <FileText className="w-4 h-4 mr-1" />,
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => {
          const isActive =
            tab.href === basePath
              ? pathname === tab.href // hanya aktif jika exact match (Discuss)
              : pathname.startsWith(tab.href) // aktif untuk subpath (Materials, Assignments, dll.)

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`flex items-center px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? 'text-purple-600 border-purple-600 bg-purple-50 font-semibold'
                  : 'text-gray-600 border-transparent hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
