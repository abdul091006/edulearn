import { type ReactNode } from "react"
import DashboardSidebar from "./DashboardSidebar"
import DashboardHeader from "./DashboardHeader"
import { getUser } from "@/app/(frontend)/_actions/getUser"
import { RoleFilterProvider } from "@/context/RoleFilterContext" 
import getClassrooms from "../../classrooms/_actions/getClassrooms"

interface DashboardLayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await getUser()

  return (
    <RoleFilterProvider>
      <div className="flex h-screen bg-gray-50">
        <DashboardSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <DashboardHeader user={user} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </RoleFilterProvider>
  )
}
