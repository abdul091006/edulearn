import { ReactNode } from 'react'
import ClassroomHeader from './_components/ClassroomHeader'
import ClassroomTabs from './_components/ClassroomTabs'
import getClassroomByID from '../_actions/getClassroomByID'
import DashboardLayout from '../../_components/layout/DashboardLayout'

export default async function ClassroomLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { id: string }
}) {
  const classroom = await getClassroomByID({ id: params.id })
  console.log(params.id)

  return (
    <DashboardLayout>
      <ClassroomHeader classroom={classroom} />
      <ClassroomTabs />
      {children}
    </DashboardLayout>
  )
}
