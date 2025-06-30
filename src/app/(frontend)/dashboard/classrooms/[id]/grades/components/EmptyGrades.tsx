import Image from "next/image"
import { FileText } from "lucide-react"

export default function EmptyGrades() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
      <div className="mb-4 rounded-full bg-purple-100 p-4">
        <FileText className="h-8 w-8 text-purple-600" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900">No grades yet</h3>
      <p className="mb-6 max-w-md text-gray-600">
        You don't have any graded assignments yet. Grades will appear here once your assignments are graded.
      </p>
      <Image
        src="/placeholder.svg?height=200&width=300"
        alt="No grades illustration"
        width={300}
        height={200}
        className="mb-6 opacity-70"
      />
      <button className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:from-purple-700 hover:to-blue-600 hover:shadow-md">
        View Pending Assignments
      </button>
    </div>
  )
}
