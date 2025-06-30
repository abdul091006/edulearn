import { Award, BookOpen, TrendingUp } from "lucide-react"

export default function GradesHeader() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 mb-6 w-full">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
          <div className="absolute top-0 right-0 w-60 h-60 bg-white rounded-full translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-white rounded-full -translate-x-1/2 translate-y-20"></div>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-between">
          <div className="text-white mb-6 lg:mb-0">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm mr-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Academic Performance</h1>
                <p className="text-indigo-100 text-lg">Track your grades and progress across all courses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
