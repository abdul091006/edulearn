export default function ProfileMenu() {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
      <a href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        Your Profile
      </a>
      <div className="border-t border-gray-200 my-1"></div>
      <a href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        Sign out
      </a>
    </div>
  )
}
