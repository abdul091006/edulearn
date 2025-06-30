'use client'
import type React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Star,
  Users,
  GraduationCap,
  Zap,
} from 'lucide-react'
import { login, LoginResponse } from '../_actions/login'

const LoginForm = () => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.currentTarget)
      const email = formData.get('email') as string
      const password = formData.get('password') as string

      const result: LoginResponse = await login({ email, password })

      if (result.success) {
        setMessage('Login successfully')
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } else {
        setMessage('Login failed')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      {/* Left Side - Animated Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"></div>

          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-yellow-400/20 rounded-lg rotate-45 animate-bounce-slow"></div>
          <div className="absolute bottom-40 left-32 w-20 h-20 bg-pink-400/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-green-400/20 rounded-lg rotate-12 animate-float animation-delay-2000"></div>

          {/* Floating particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/20 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Main Illustration Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white animate-fade-in">
          {/* Main Illustration */}
          <div className="relative mb-8">
            {/* Central Learning Hub */}
            <div className="relative w-80 h-80 mx-auto">
              {/* Main Circle */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                  <GraduationCap className="w-16 h-16 text-white" />
                </div>
              </div>

              {/* Orbiting Elements */}
              <div className="absolute inset-0 animate-spin-slow">
                {/* Student Icons */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <Star className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Connection Lines */}
              <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 w-0.5 h-20 bg-white/30 transform -translate-x-1/2 -translate-y-full"></div>
                <div className="absolute top-1/2 left-1/2 w-20 h-0.5 bg-white/30 transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 w-0.5 h-20 bg-white/30 transform -translate-x-1/2"></div>
                <div className="absolute top-1/2 left-1/2 w-20 h-0.5 bg-white/30 transform -translate-y-1/2 -translate-x-full"></div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center max-w-md mt-10">
            <h2 className="text-3xl font-bold mb-4">Welcome to eDULearn</h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Join thousands of educators transforming learning experiences with our innovative
              platform.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Back to Home Link */}
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>

          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                eDULearn
              </span>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          {/* Success/Error Message */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-xl ${
                message.includes('successfully')
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={HandleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              <div className="flex items-center">
                Sign In
                <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
