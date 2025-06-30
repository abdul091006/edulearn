"use client"

import type React from "react"
import { SendHorizonal, Loader2, Smile } from "lucide-react"
import clsx from "clsx"
import { useState } from "react"

interface CommentInputProps {
  message: string
  setMessage: (msg: string) => void
  replyTo: string | null
  onSend: (message: string) => void 
  classroomId: string
}

export default function CommentInput({
  message,
  setMessage,
  replyTo,
  onSend,
  classroomId,
}: CommentInputProps) {
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!message.trim()) return
    setLoading(true)

    try {
      onSend(message.trim())
      setMessage("")
    } catch (err) {
      console.error("Failed to send comment:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="p-3 bg-white border-t border-gray-200">
      <div className="flex gap-2 items-end">
        <div className="flex-1 relative">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent text-sm resize-none outline-none max-h-20 min-h-[20px]"
              placeholder={replyTo ? "Balas pesan..." : "Ketik pesan..."}
              rows={1}
              style={{ height: "auto" }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = "auto"
                target.style.height = target.scrollHeight + "px"
              }}
            />
          </div>
        </div>

        <button
          onClick={handleSend}
          className={clsx(
            "p-2 rounded-full transition-all duration-200 flex items-center justify-center min-w-[40px] h-10",
            {
              "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105":
                message.trim() && !loading,
              "bg-gray-300 text-gray-500 cursor-not-allowed": !message.trim() || loading,
            }
          )}
          disabled={!message.trim() || loading}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <SendHorizonal className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  )
}
