import type { Assignment } from '@/types/assignment'
import AssignmentItem from './AssignmentItem'

interface AssignmentsListProps {
  assignments: Assignment[]
}

export default function AssignmentsList({ assignments }: AssignmentsListProps) {
  return (
    <div className="divide-y divide-gray-200">
      {assignments.map((assignment) => (
        <AssignmentItem key={assignment.id} assignment={assignment} />
      ))}
    </div>
  )
}
