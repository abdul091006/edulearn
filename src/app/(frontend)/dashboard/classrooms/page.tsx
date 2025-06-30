import { getUser } from '../../_actions/getUser'
import DashboardLayout from '../_components/layout/DashboardLayout'
import getClassrooms from './_actions/getClassrooms'
import ClassroomsOverview from './_components/ClassroomsOverview'

export default async function ClassroomsPage() {
  let classrooms = await getClassrooms()

  return (
    <DashboardLayout>
      <ClassroomsOverview classrooms={classrooms} />
    </DashboardLayout>
  )
}
