import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date from ISO string to readable format
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Calculate days left until due date
export function getDaysLeft(dateString: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const dueDate = new Date(dateString)
  dueDate.setHours(0, 0, 0, 0)

  const diffTime = dueDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}
