import { Submission } from "@/types/submission"

interface GradeInfoProps {
  submission: Submission}

export function GradeInfo({ submission }: GradeInfoProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 hover:shadow-2xl transition-all duration-300">
      {/* Header dengan gradient accent */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-slate-800">Informasi Submission</h2>
          <p className="text-slate-500 text-sm">Detail lengkap submission siswa</p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="group">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Kelas</label>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 rounded-xl border border-blue-100">
              <p className="text-slate-800 font-semibold text-lg">{submission.classroom}</p>
            </div>
          </div>

          <div className="group">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Tugas</label>
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-4 py-3 rounded-xl border border-purple-100">
              <p className="text-slate-800 font-semibold">{submission.assignment}</p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="group">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Siswa</label>
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-3 rounded-xl border border-emerald-100 flex items-center">
              <p className="text-slate-800 font-semibold">{submission.student}</p>
            </div>
          </div>

          <div className="group">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
              Tanggal Submit
            </label>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3 rounded-xl border border-amber-100 flex items-center">
              <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-slate-800 font-medium">
                {new Date(submission.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
