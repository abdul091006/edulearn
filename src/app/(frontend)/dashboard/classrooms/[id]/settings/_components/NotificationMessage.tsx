interface Notification {
  type: 'success' | 'error'
  text: string
}

export function NotificationMessage({ message }: { message: Notification | null }) {
  if (!message) return null
  return (
    <div
      className={`mt-4 px-4 py-3 rounded-xl text-sm ${
        message.type === 'success'
          ? 'bg-green-100 text-green-700 border border-green-200'
          : 'bg-red-100 text-red-700 border border-red-200'
      }`}
    >
      {message.text}
    </div>
  )
}