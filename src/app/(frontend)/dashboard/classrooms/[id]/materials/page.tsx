import { getUser } from '@/app/(frontend)/_actions/getUser'
import MaterialTab from './_components/MaterialTab'
import { getMaterials } from './_actions/getMaterials'

export default async function AssignmentsPage({ params }: { params: { id: string } }) {
  const user = await getUser()
  const materials = await getMaterials(params.id)

  return <MaterialTab materials={materials} user={user} classroomId={params.id} />
}
