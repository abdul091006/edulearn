import { getUser } from '../../_actions/getUser'
import DashboardLayout from '../_components/layout/DashboardLayout'
import ProfileHeader from './_components/ProfileHeader'
import ProfileTabs from './_components/ProfileTabs'

export default async function ProfilePage() {
  const user = await getUser()

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <ProfileHeader user={user} />
        <ProfileTabs user={user} />
      </div>
    </DashboardLayout>
  )
}
