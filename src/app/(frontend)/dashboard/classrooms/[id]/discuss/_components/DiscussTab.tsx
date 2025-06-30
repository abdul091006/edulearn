"use client";

import { useState, useRef, useEffect } from "react";
import type { Comment } from "@/payload-types";
import CommentItem from "./CommentItem";
import ReplyBanner from "./ReplyBanner";
import CommentInput from "./CommentInput";
import { MessageSquare, Users } from "lucide-react";
import { createComment } from "../_actions/createComment";
import { deleteComment } from "../_actions/deleteComment";
import { updateComment } from "../_actions/updateComment";

interface DiscussTabProps {
  comments: Comment[];
  currentUserId: string;
  classroomId: string;
}

export default function DiscussTab({
  comments,
  currentUserId,
  classroomId,
}: DiscussTabProps) {
  const [message, setMessage] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editableMessage, setEditableMessage] = useState("");
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  const repliedComment = replyTo
    ? localComments.find((c) => String(c.id) === replyTo)
    : null;

  useEffect(() => {
    if (replyTo && chatAreaRef.current) {
      const element = chatAreaRef.current.querySelector(`[data-id="${replyTo}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [replyTo]);

  const handleReplyClick = (id: string) => {
    const element = chatAreaRef.current?.querySelector(`[data-id="${id}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSend = async (msg: string) => {
    try {
      const newComment = await createComment({
        message: msg,
        parent: replyTo ?? null,
        classroom: classroomId,
      });

      setLocalComments((prev) => [...prev, newComment]);
      setMessage("");
      setReplyTo(null);

      setTimeout(() => {
        const newElement = chatAreaRef.current?.lastElementChild;
        if (newElement) {
          newElement.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }, 100);
    } catch (err) {
      console.error("Failed to send comment:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteComment(id);
      setLocalComments((prev) =>
        prev.filter((c) => {
          const commentId = String(c.id);
          const parentId =
            typeof c.parent === "object" && c.parent !== null
              ? String(c.parent.id)
              : String(c.parent);
          return commentId !== id && parentId !== id;
        })
      );
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  const handleUpdate = async (updatedComment: Comment) => {
    try {
      const result = await updateComment(String(updatedComment.id), updatedComment.message);
      setLocalComments((prev) =>
        prev.map((c) => (c.id === result.id ? result : c))
      );
      setEditingCommentId(null);
      setEditableMessage("");
    } catch (err) {
      console.error("Failed to update comment:", err);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] bg-gray-50 rounded-xl shadow-lg border border-gray-200 overflow-hidden mt-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Class Discussion</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div
        ref={chatAreaRef}
        className="flex-1 overflow-y-auto p-4 space-y-1 bg-gradient-to-b from-gray-50 to-gray-100"
      >
        {localComments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6">
              <MessageSquare className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-3">No message yet</h3>
            <p className="text-gray-500 text-sm max-w-sm">
              Start a conversation by sending the first message to this discussion group.
            </p>
          </div>
        ) : (
          localComments.map((comment) => (
            <div key={comment.id} data-id={String(comment.id)}>
              <CommentItem
                comment={comment}
                currentUserId={currentUserId}
                onReply={(id) => setReplyTo(id)}
                onEdit={(id, msg) => {
                  setEditingCommentId(id);
                  setEditableMessage(msg);
                }}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                editingCommentId={editingCommentId}
                editableMessage={editableMessage}
                setEditableMessage={setEditableMessage}
                setEditingCommentId={setEditingCommentId}
                setLocalComments={setLocalComments}
                onReplyClick={handleReplyClick}
                localComments={localComments}
              />
            </div>
          ))
        )}
      </div>

      {replyTo && repliedComment && (
        <ReplyBanner onCancel={() => setReplyTo(null)} replyTo={repliedComment} />
      )}

      <CommentInput
        classroomId={classroomId}
        message={message}
        setMessage={setMessage}
        replyTo={replyTo}
        onSend={handleSend}
      />
    </div>
  );
}
