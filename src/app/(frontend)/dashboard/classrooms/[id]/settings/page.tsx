import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Settings, ArrowLeft } from "lucide-react"
import { ClassroomSettingsForm } from "./_components/ClassroomSettingsForm"
import getClassroomByID from "../../_actions/getClassroomByID"

interface ClassroomSettingsPageProps {
  params: {
    id: string
  }
}

export default async function ClassroomSettingsPage({ params }: ClassroomSettingsPageProps) {
  const classroom = await getClassroomByID({ id: params.id })

  if (!classroom) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto py-8 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-8">
            {/* Breadcrumb/Back button */}
            <div className="flex items-center space-x-2 mb-6">
              <button className="flex items-center text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Kembali
              </button>
              <span className="text-gray-400">/</span>
              <span className="text-sm text-gray-600">{classroom.name}</span>
            </div>

            {/* Main Header */}
            <div className="relative">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                    Pengaturan Kelas
                  </h1>
                  <p className="text-gray-600 text-lg mt-1">Kelola pengaturan dan informasi kelas Anda</p>
                </div>
              </div>

              {/* Subtle decorative element */}
              <div className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-xl -z-10"></div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-xl -z-10"></div>
            </div>

            {/* Class info bar */}
            <div className="mt-6 p-4 bg-white/60 backdrop-blur-sm border border-blue-200/50 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">{classroom.name}</span>
                  </div>
                  <div className="h-4 w-px bg-gray-300"></div>
                  <div className="text-sm text-gray-600">
                    Kode: <span className="font-mono font-medium text-blue-600">{classroom.classCode}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Aktif</span>
                </div>
              </div>
            </div>
          </div>

          <Suspense fallback={<ClassroomSettingsSkeleton />}>
            <ClassroomSettingsForm classroom={classroom} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function ClassroomSettingsSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
          <div className="p-6 border-b border-gray-200">
            <div className="h-6 w-48 bg-gradient-to-r from-blue-200 to-purple-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-64 bg-gradient-to-r from-purple-200 to-blue-200 rounded animate-pulse"></div>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-blue-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-purple-200 rounded animate-pulse"></div>
              <div className="h-20 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
