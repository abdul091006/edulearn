import { getUser } from '@/app/(frontend)/_actions/getUser'
import getAssignments from './_actions/getAssignments'
import getClassroomByID from '../../_actions/getClassroomByID'
import { getSubmissions } from '../grades/_actions/getSubmissions'
import AssignmentsTab from './_components/AssignmentsTab'

export default async function AssignmentsPage({ params }: { params: { id: string } }) {
  const classroom = await getClassroomByID({ id: params.id })
  const assignments = await getAssignments()
  const user = await getUser()
  const submissions = await getSubmissions('student')

  console.log(submissions)

  return (
    <AssignmentsTab
      classroom={classroom}
      assignments={assignments}
      submissions={submissions}
      userId={user.id}
    />
  )
}
