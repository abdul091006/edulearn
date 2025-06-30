'use client'

import { useState } from 'react'
import { BasicInfoSection } from './BasicInfoSection'
import { ClassCodeSection } from './ClassCodeSection'
import { JoinSettingsSection } from './JoinSettingsSection'
import { DeleteClassSection } from './DeleteClassSection'
import { Classroom } from '@/types/classroom'

interface FormData {
  name: string
  description: string
  classCode: string
  requireApproval: boolean
}

interface Notification {
  type: 'success' | 'error'
  text: string
}

interface ClassroomSettingsFormProps {
  classroom: Classroom
}

export function ClassroomSettingsForm({ classroom }: ClassroomSettingsFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingClassCode, setIsLoadingClassCode] = useState(false)
  const [isLoadingApproval, setIsLoadingApproval] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [formData, setFormData] = useState({
    name: classroom.name,
    description: classroom.description || '',
    classCode: classroom.classCode,
    requireApproval: classroom.requireApproval ?? false,
  })

  const [basicInfoMessage, setBasicInfoMessage] = useState<Notification | null>(null)
  const [classCodeMessage, setClassCodeMessage] = useState<Notification | null>(null)
  const [approvalMessage, setApprovalMessage] = useState<Notification | null>(null)

  return (
    <div className="space-y-8">
      <BasicInfoSection
        formData={formData}
        setFormData={setFormData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        basicInfoMessage={basicInfoMessage}
        setBasicInfoMessage={setBasicInfoMessage}
        classroomId={classroom.id}
      />
      <ClassCodeSection
        formData={formData}
        setFormData={setFormData}
        isLoadingClassCode={isLoadingClassCode}
        setIsLoadingClassCode={setIsLoadingClassCode}
        classCodeMessage={classCodeMessage}
        setClassCodeMessage={setClassCodeMessage}
        classroomId={classroom.id}
      />
      <JoinSettingsSection
        formData={formData}
        setFormData={setFormData}
        isLoadingApproval={isLoadingApproval}
        setIsLoadingApproval={setIsLoadingApproval}
        approvalMessage={approvalMessage}
        setApprovalMessage={setApprovalMessage}
        classroomId={classroom.id}
      />
      <DeleteClassSection
        classroom={classroom}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
    </div>
  )
}