import { getUser } from '@/app/(frontend)/_actions/getUser'
import DiscussTab from './_components/DiscussTab'
import { getComments } from './_actions/getComments'

export default async function ClassroomDetailPage({ params }: { params: { id: string } }) {
  const comments = await getComments(params.id)
  const user = await getUser()
  return <DiscussTab comments={comments} currentUserId={user.id} classroomId={params.id} />
}
