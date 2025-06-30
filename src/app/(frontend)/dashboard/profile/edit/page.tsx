import { getUser } from '@/app/(frontend)/_actions/getUser'
import DashboardLayout from '../../_components/layout/DashboardLayout'
import EditProfileForm from './_components/EditProfileForm'

export default async function EditProfilePage() {
  const user = await getUser()

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <EditProfileForm user={user} />
      </div>
    </DashboardLayout>
  )
}
