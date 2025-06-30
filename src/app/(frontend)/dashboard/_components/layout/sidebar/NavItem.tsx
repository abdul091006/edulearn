"use client"

import type React from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight } from "lucide-react"

interface NavItemProps {
  href: string
  icon: React.ElementType
  label: string
  isActive: boolean
  hasSubmenu?: boolean
  isSubmenuOpen?: boolean
  toggleSubmenu?: () => void
  children?: React.ReactNode
}

export default function NavItem({
  href,
  icon: Icon,
  label,
  isActive,
  hasSubmenu = false,
  isSubmenuOpen = false,
  toggleSubmenu,
  children,
}: NavItemProps) {
  return (
    <div className="mb-1">
      <Link
        href={hasSubmenu ? "#" : href}
        onClick={(e) => {
          if (hasSubmenu) {
            e.preventDefault()
            toggleSubmenu?.()
          }
        }}
        className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
          isActive ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <Icon className="w-5 h-5 mr-3" />
        <span className="flex-1">{label}</span>
        {hasSubmenu && (
          <div className="ml-auto">
            {isSubmenuOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </div>
        )}
      </Link>
      {hasSubmenu && isSubmenuOpen && <div className="mt-1 ml-4 pl-4 border-l border-gray-200">{children}</div>}
    </div>
  )
}
