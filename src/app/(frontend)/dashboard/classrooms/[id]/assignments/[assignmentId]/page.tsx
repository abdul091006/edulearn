import { getUser } from '@/app/(frontend)/_actions/getUser'
import AssignmentDetail from './components/AssignmentDetail'
import getAssignmentByID from '@/app/(frontend)/dashboard/classrooms/[id]/assignments/_actions/getAssignmentByID'
import { getSubmissions } from '@/app/(frontend)/dashboard/classrooms/[id]/grades/_actions/getSubmissions'

export default async function AssignmentPage({ params }: { params: { assignmentId: string } }) {
  const user = await getUser()
  const assignment = await getAssignmentByID({ id: params.assignmentId })
  const submissions = await getSubmissions('student')

  return <AssignmentDetail user={user} assignment={assignment} submissions={submissions} />
}
