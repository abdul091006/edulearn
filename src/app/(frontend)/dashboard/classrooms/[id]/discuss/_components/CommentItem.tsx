'use client'

import { CheckCheck } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Classroom, ClassroomMember, Comment, Member } from '@/payload-types'

interface CommentItemProps {
  comment: Comment
  currentUserId: string
  onReply: (id: string) => void
  onEdit: (id: string, message: string) => void
  onDelete: (id: string) => void
  onUpdate: (comment: Comment) => void
  editingCommentId: string | null
  editableMessage: string
  setEditableMessage: (msg: string) => void
  setEditingCommentId: (id: string | null) => void
  setLocalComments: (fn: (prev: Comment[]) => Comment[]) => void
  onReplyClick: (id: string) => void
  localComments: Comment[]
}

export default function CommentItem({
  comment,
  currentUserId,
  onReply,
  onEdit,
  onDelete,
  onUpdate,
  editingCommentId,
  editableMessage,
  setEditableMessage,
  setEditingCommentId,
  onReplyClick,
  localComments,
}: CommentItemProps) {
  const author = typeof comment.author === 'object' ? (comment.author as ClassroomMember) : null
  const member = author?.member as Member | undefined
  const authorId = member?.id ?? ''
  const authorName = member?.name ?? 'Pengguna'
  const authorRole = author?.role ?? 'unknown'
  const classroomName = (comment.classroom as Classroom).name ?? 'Unknown Class'
  const isCurrentUser = String(authorId) === String(currentUserId)
  const repliedComment = comment.parent
    ? localComments.find((c) => {
        const parentId =
          typeof comment.parent === 'object' && comment.parent !== null
            ? String(comment.parent.id)
            : String(comment.parent)
        return String(c.id) === parentId
      })
    : null

  const isEditable = () => {
    const now = Date.now()
    const created = new Date(comment.createdAt).getTime()
    return isCurrentUser && now - created <= 60000
  }

  return (
    <div className="space-y-2 mb-4" data-id={String(comment.id)}>
      <div className={`flex w-full ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-[85%] min-w-[200px] ${isCurrentUser ? 'mr-3' : 'ml-3'}`}>
          {/* Reply Preview */}
          {repliedComment && (
            <div
              className="w-full cursor-pointer mb-2"
              onClick={() =>
                onReplyClick(
                  typeof comment.parent === 'object'
                    ? String(comment.parent?.id)
                    : String(comment.parent),
                )
              }
            >
              <div className="w-full bg-white border-l-4 border-blue-400 px-3 py-2 rounded-lg shadow-sm max-h-[64px] overflow-hidden">
                <p className="text-xs font-medium text-blue-800 truncate mb-0.5">
                  {((repliedComment.author as ClassroomMember).member as Member)?.name ||
                    'Pengguna'}
                </p>
                <p className="text-xs text-gray-700 line-clamp-1">{repliedComment.message}</p>
              </div>
            </div>
          )}

          {/* Author label with role */}
          {!isCurrentUser && (
            <div className="text-xs text-gray-600 mb-1 font-medium">
              {authorName} ({authorRole}) - {classroomName}
            </div>
          )}

          {/* Chat Bubble */}
          <div
            className={`relative px-4 py-3 rounded-2xl shadow-sm min-h-[50px] flex flex-col justify-between ${
              isCurrentUser
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-md'
                : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
            }`}
          >
            {editingCommentId === String(comment.id) ? (
              <div className="space-y-3">
                <textarea
                  value={editableMessage}
                  onChange={(e) => setEditableMessage(e.target.value)}
                  className={`w-full text-sm resize-none bg-transparent border-none outline-none min-h-[60px] ${
                    isCurrentUser ? 'text-white' : 'text-gray-800'
                  }`}
                  rows={3}
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={async () => {
                      const updated = {
                        ...comment,
                        message: editableMessage,
                      }
                      onUpdate(updated)
                    }}
                    className={`px-3 py-1 text-xs rounded-lg transition-colors font-medium ${
                      isCurrentUser
                        ? 'bg-white/20 hover:bg-white/30 text-white'
                        : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                    }`}
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => setEditingCommentId(null)}
                    className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                      isCurrentUser
                        ? 'bg-white/10 hover:bg-white/20 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div
                  className={`text-sm leading-relaxed break-words mb-2 ${
                    isCurrentUser ? 'text-end' : 'text-start'
                  }`}
                >
                  {comment.message}
                </div>
                <div
                  className={`flex items-center justify-between text-xs ${
                    isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  <span>{formatDate(comment.createdAt)}</span>
                </div>
              </>
            )}

            {/* Bubble tail */}
            <div
              className={`absolute top-3 w-0 h-0 ${
                isCurrentUser
                  ? '-right-2 border-l-[12px] border-l-purple-500 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent'
                  : '-left-2 border-r-[12px] border-r-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent'
              }`}
            />
          </div>

          {/* Reply/Edit/Delete Buttons */}
          {editingCommentId !== String(comment.id) && (
            <div
              className={`flex items-center gap-4 mt-2 text-xs ${
                isCurrentUser ? 'justify-end' : 'justify-start'
              }`}
            >
              <button
                onClick={() => onReply(String(comment.id))}
                className="text-blue-600 hover:text-purple-600 transition-colors font-medium hover:underline"
              >
                Balas
              </button>
              {isEditable() && (
                <>
                  <button
                    onClick={() => onEdit(String(comment.id), comment.message)}
                    className="text-amber-600 hover:text-amber-700 transition-colors hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(String(comment.id))}
                    className="text-red-500 hover:text-red-600 transition-colors hover:underline"
                  >
                    Hapus
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
