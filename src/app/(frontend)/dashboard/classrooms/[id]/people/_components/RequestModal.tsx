'use client'

import { X } from 'lucide-react'
import { useTransition } from 'react'
import type { Member } from '@/payload-types'
import { approveMember, rejectMember } from '../../../_actions/updateRequestStatus'

interface RequestModalProps {
  requests: Member[]
  onClose: () => void
  onApprove: (member: Member) => void
  onReject: (memberId: string) => void
}

export default function RequestModal({
  requests,
  onClose,
  onApprove,
  onReject,
}: RequestModalProps) {
  const [isPending, startTransition] = useTransition()

  const handleApprove = (member: Member) => {
    startTransition(async () => {
      await approveMember(String(member.id))
      onApprove(member)
      onClose()
    })
  }

  const handleReject = (member: Member) => {
    startTransition(async () => {
      await rejectMember(String(member.id))
      onReject(String(member.id))
      onClose()
    })
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative shadow-xl">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Join Requests ({requests.length})
        </h3>

        {requests.length === 0 ? (
          <p className="text-gray-500 text-sm">No pending requests.</p>
        ) : (
          <ul className="space-y-3">
            {requests.map((req) => {
              const member = req as any
              return (
                <li
                  key={req.id}
                  className="border rounded-md p-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-800">{req.name ?? 'Unknown'}</p>
                    <p className="text-sm text-gray-500">{req.email ?? '-'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(req)}
                      disabled={isPending}
                      className="text-sm px-2 py-1 rounded bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(req)}
                      disabled={isPending}
                      className="text-sm px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
