'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  FileText,
  Calendar,
  Clock,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  User,
} from 'lucide-react'
import type { Assignment } from '@/types/assignment'
import { formatDate, getDaysLeft } from '@/lib/utils'

interface AssignmentItemProps {
  assignment: Assignment
}

export default function AssignmentItem({ assignment }: AssignmentItemProps) {
  const params = useParams()
  const classroomId = params?.id as string

  const daysLeft = getDaysLeft(assignment.dueDate)

  const getStatusConfig = (status: Assignment["status"], daysLeft: number) => {
    switch (status) {
      case "Done":
        return {
          bgColor: "bg-green-50 hover:bg-green-100",
          borderColor: "border-l-green-500",
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          icon: CheckCircle,
          badge: {
            bg: "bg-green-100",
            text: "text-green-700",
            label: "Done",
          },
          titleColor: "text-gray-800",
          descColor: "text-gray-600",
        }
      case "OverDue":
        return {
          bgColor: "bg-red-50 hover:bg-red-100",
          borderColor: "border-l-red-500",
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          icon: AlertTriangle,
          badge: {
            bg: "bg-red-100",
            text: "text-red-700",
            label: "Overdue",
          },
          titleColor: "text-red-900",
          descColor: "text-red-700",
        }
      default:
        return {
          bgColor: "bg-blue-50 hover:bg-blue-100",
          borderColor: "border-l-blue-500",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          icon: FileText,
          badge: {
            bg: daysLeft <= 1 ? "bg-orange-100" : "bg-blue-100",
            text: daysLeft <= 1 ? "text-orange-700" : "text-blue-700",
            label: daysLeft === 0 ? "Due Today" : "In Progress",
          },
          titleColor: "text-gray-900",
          descColor: "text-gray-700",
        }
    }
  }

  const config = getStatusConfig(assignment.status, daysLeft)
  const StatusIcon = config.icon

  return (
    <Link
      href={`/dashboard/classrooms/${classroomId}/assignments/${assignment.id}`}
      className="w-full text-left block transition-colors"
    >
      <div className={`px-5 py-4 ${config.bgColor} border-l-4 ${config.borderColor} transition-all duration-200`}>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between">
          <div className="flex items-start flex-1">
            <div className={`p-2 rounded-lg ${config.iconBg} mr-4 flex-shrink-0`}>
              <StatusIcon className={`h-5 w-5 ${config.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h4 className={`text-base font-medium ${config.titleColor} line-clamp-1 pr-2`}>
                  {assignment.title}
                </h4>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.badge.bg} ${config.badge.text} flex-shrink-0`}>
                  {config.badge.label}
                </span>
              </div>
              <p className={`text-sm ${config.descColor} mb-3 line-clamp-2`}>
                {assignment.description}
              </p>
              {assignment.status === "OverDue" && (
                <div className="mb-3 p-2 bg-red-100 rounded-md">
                  <div className="flex items-center text-sm text-red-800">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <span>{Math.abs(daysLeft)} day{Math.abs(daysLeft) !== 1 ? "s" : ""} ago</span>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                  <span>Due: {formatDate(assignment.dueDate)}</span>
                </div>
                {assignment.status === "In Progress" && (
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                    <span>
                      {daysLeft > 0
                        ? `${daysLeft} days left`
                        : daysLeft === 0
                        ? "Due today"
                        : `${Math.abs(daysLeft)} days overdue`}
                    </span>
                  </div>
                )}
                {assignment.classroom && (
                  <div className="flex items-center">
                    <User className="h-3.5 w-3.5 mr-1.5" />
                    <span className="truncate max-w-32">
                      {assignment.classroom.teacher ?? 'Unknown'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-2 sm:mt-0 sm:ml-4 flex items-center">
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </Link>
  )
}
