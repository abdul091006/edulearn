import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link"
type ButtonSize = "sm" | "md" | "lg" | "xl"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variantStyles = {
    primary: "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white",
    secondary: "bg-white text-purple-600 hover:bg-purple-50",
    outline: "border border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent",
    ghost: "bg-transparent hover:bg-purple-50 text-purple-600",
    link: "bg-transparent underline-offset-4 hover:underline text-purple-600 hover:bg-transparent",
  }

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 rounded-md",
    md: "text-sm px-4 py-2 rounded-md",
    lg: "text-base px-5 py-2.5 rounded-lg",
    xl: "text-lg px-6 py-3 rounded-lg",
  }

  const widthStyles = fullWidth ? "w-full" : ""

  return (
    <button className={cn(baseStyles, variantStyles[variant], sizeStyles[size], widthStyles, className)} {...props}>
      {children}
    </button>
  )
}
