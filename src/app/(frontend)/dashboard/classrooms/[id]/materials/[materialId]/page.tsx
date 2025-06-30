import DashboardLayout from '../../../../_components/layout/DashboardLayout'
import { getMaterialById } from '../_actions/getMaterialById'
import MaterialDetail from '../_components/MaterialDetail'

export default async function MaterialPage({ params }: { params: { materialId: string } }) {
  const material = await getMaterialById(params.materialId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MaterialDetail material={material} />
      </div>
    </div>
  )
}
