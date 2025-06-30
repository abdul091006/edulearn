import { getUser } from '@/app/(frontend)/_actions/getUser'
import getClassroomByID from '../../_actions/getClassroomByID'
import PeopleTab from './_components/PeopleTab'
import { getPendingRequests } from './_actions/getPendingRequests'

export default async function AssignmentsPage({ params }: { params: { id: string } }) {
  const classroom = await getClassroomByID({ id: params.id })
  const user = await getUser()
  const pendingRequests = await getPendingRequests(params.id)
  console.log(pendingRequests)

  return <PeopleTab classroom={classroom} pendingRequests={pendingRequests} user={user} />
}
