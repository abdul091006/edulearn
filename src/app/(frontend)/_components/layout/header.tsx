"use client"

import Link from "next/link"
import { BookOpen } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

export function Header({ user }: any) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              eDULearn
            </span>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-purple-50 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Pricing
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:text-purple-600 transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Desktop user section */}
          <div className="hidden md:flex items-center gap-4">
            {user && user.name ? (
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">{user.name}</span>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium hover:text-purple-600 transition-colors">
                  Log in
                </Link>
                <Button variant="primary" size="md" onClick={() => router.push("/register")}>
                  Sign Up Free
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link
                href="#features"
                className="text-sm font-medium hover:text-purple-600 transition-colors px-3 py-2 rounded-md hover:bg-purple-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium hover:text-purple-600 transition-colors px-3 py-2 rounded-md hover:bg-purple-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium hover:text-purple-600 transition-colors px-3 py-2 rounded-md hover:bg-purple-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#faq"
                className="text-sm font-medium hover:text-purple-600 transition-colors px-3 py-2 rounded-md hover:bg-purple-50"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>

              <div className="pt-4 border-t flex flex-col space-y-3">
                {user && user.name ? (
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    {user.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-sm font-medium text-center hover:text-purple-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Button
                      variant="primary"
                      size="md"
                      fullWidth
                      onClick={() => {
                        setIsMenuOpen(false)
                        router.push("/register")
                      }}
                    >
                      Sign Up Free
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
