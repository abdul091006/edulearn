'use client'

import { useState } from 'react'
import { gradeSubmission } from '../_actions/gradeSubmission'

function GradeButton({ submissionId }: { submissionId: string }) {
  const [open, setOpen] = useState(false)
  const [grade, setGrade] = useState('')
  const [feedback, setFeedback] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    const result = await gradeSubmission({
      submissionId,
      grade: parseInt(grade),
      feedback,
    })

    if (result.success) {
      setMessage('Berhasil memberi nilai!')
      window.location.reload()
      setOpen(false)
    } else {
      setMessage(result.message || 'Terjadi kesalahan')
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
        Beri Nilai
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Beri Nilai</h2>
            <input
              type="number"
              placeholder="Nilai (0-100)"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
            />
            <textarea
              placeholder="Feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
            />
            {message && <p className="text-sm text-red-500 mb-2">{message}</p>}
            <div className="flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="text-sm text-gray-500">Batal</button>
              <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-1 text-sm rounded hover:bg-green-700">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GradeButton
