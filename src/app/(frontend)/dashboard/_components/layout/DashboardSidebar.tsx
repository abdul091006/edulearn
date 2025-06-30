'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  Home,
  Users,
  FileText,
  Award,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import NavItem from './sidebar/NavItem'
import getClassrooms from '../../classrooms/_actions/getClassrooms'
import { useRoleFilter } from '@/context/RoleFilterContext'

type Classroom = {
  id: string
  name: string
}

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(true)
  const [classrooms, setClassrooms] = useState<Classroom[]>([])

  const { role } = useRoleFilter()

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const toggleSubmenu = () => setIsSubmenuOpen(!isSubmenuOpen)

  useEffect(() => {
    async function fetchClassrooms() {
      try {
        const data = await getClassrooms(role)
        setClassrooms(data)
      } catch (error) {
        console.error('Gagal memuat classrooms:', error)
      }
    }

    fetchClassrooms()
  }, [role])

  return (
    <>
      {/* Tombol mobile menu */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md text-gray-700"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 w-64 flex-shrink-0 flex flex-col z-40 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'fixed inset-y-0 left-0'
            : 'fixed inset-y-0 -left-64 md:left-0 md:relative'
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-purple-600 mr-2" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              eDULearn
            </span>
          </div>
        </div>

        {/* Navigasi */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <NavItem
            href="/dashboard"
            icon={Home}
            label="Dashboard"
            isActive={pathname === '/dashboard'}
          />

          <NavItem
            href="#"
            icon={Users}
            label="My Classes"
            isActive={pathname.includes('/dashboard/classrooms')}
            hasSubmenu
            isSubmenuOpen={isSubmenuOpen}
            toggleSubmenu={toggleSubmenu}
          >
            {classrooms.length > 0 ? (
              classrooms.map((kelas) => (
                <NavItem
                  key={kelas.id}
                  href={`/dashboard/classrooms/${kelas.id}`}
                  icon={Users}
                  label={kelas.name}
                  isActive={pathname.startsWith(`/dashboard/classrooms/${kelas.id}`)}
                />
              ))
            ) : (
              <div className="text-sm text-gray-500 px-4 py-2">Tidak ada kelas</div>
            )}
          </NavItem>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <NavItem href="/logout" icon={LogOut} label="Logout" isActive={false} />
          </div>
        </nav>
      </aside>
    </>
  )
}
